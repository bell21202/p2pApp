const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const requireAuth = require('../middlewares/requireAuth');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const Message = mongoose.model('Message');

const router = express.Router();

//todo_pp: be sure to use .get instead of post for some of these, and in authcontext

router.post('/saveAccount', requireAuth, async (req, res) => {
    const {email, firstname, lastname, memberType, cohortDate} = req.body;
    var user = req.user;
    userId = user._id;
    try
    {
         // update our user info
        await User.findOneAndUpdate({_id: userId}, {email, firstname, lastname, memberType, cohortDate}, {returnOriginal: false}, (err,doc) => {
            if (err) {
                throw err;
            }
            // get the updated user back
            user = doc;
            res.send({"user" : user}); // send the user back
        });
    }
    catch (err) {
        return res.status(422).send(err.message); 
    }
});

router.post('/submitPost', requireAuth, async (req, res) => {
    const {postText, hubType, firstname, lastname, parentId, isAdmin} = req.body;

    // convert our hubtype
    var type = convertHubType(hubType);

    var user = req.user;
    userId = user._id;

    try{
        const post = new Post({'createdBy':userId,'createdAt': Date.now(), 'hubType': type, 'message': postText, firstname, lastname, parentId, isAdmin});
        await post.save();

        // get all posts and send back, might put in separate method
        const posts = await Post.find({'hubType' : type}).sort({createdAt: -1});
        if(!posts) {
            return res.status(422).send({error: 'Posts retrieval error'});
        }  
        res.send({"posts" : posts});
    }
    catch (err) {
        console.log("error during post submittal");
        return res.status(422).send(err.message);
    }
});

router.post('/getPosts', requireAuth, async (req, res) => {
    const {hubType} = req.body;
    var type;
    var posts;
    
    try
    {
        type = convertHubType(hubType);
        posts = await Post.find({'hubType' : type}).sort({createdAt: -1}); // this should be better, consolidate functions
        
        if(!posts) {
            return res.status(422).send({error: 'Posts retrieval error'});
        }
        res.send({'posts': posts});
    }
    catch (err) {
        console.log('error during post retreival');
        return res.status(422).send(err.message);
    }
});

router.post('/getAdminPosts', requireAuth, async (req, res) => {
    try
    {
        posts = await Post.find({'isAdmin' : true}).sort({createdAt: -1}); // this should be better, consolidate functions
        if(!posts) {
            return res.status(422).send({error: 'Posts retrieval error'});
        }
        res.send({'posts': posts});
    }
    catch (err) {
        console.log('error during post retreival');
        return res.status(422).send(err.message);
    }
})

router.post('/changePassword', requireAuth, async (req, res) => {
    const {oldPass, newPass} = req.body;
    const user = req.user;
    userId = user._id;

    try{
        await user.comparePassword(oldPass);

        // now we can update the users password
        await User.findOneAndUpdate({_id: userId}, {password: newPass}, (err,doc) => {
            if (err) {
                throw err;
            }
        });
        res.status(200).send('completed');
    }
    catch(err) {
        // the entered password doesn't match
        return res.status(401).send(err.message);
    }
})

router.post('/getUsers', requireAuth, async (req, res) => {
    try {
        users = await User.find().sort({firstname: 1});
        if(!users) {
            return res.status(422).send({error: 'Users retrieval error'});
        }
        res.send({'users': users});
    }
    catch (err) {
        console.log('error during users retreival');
        return res.status(422).send(err.message);
    }
})

router.post('/sendChat', requireAuth, async (req, res) => {
    const {messageText, messageTo} = req.body;
    var user = req.user;
    userId = user._id;

    try{
        const message = new Message({'text': messageText, 'from': userId, 'to' : messageTo, 'createdAt': Date.now()});
        await message.save();

        //res.status(200).send('completed');
        res.send({"newMessage" : message});
    }
    catch (err) {
        console.log("error during sending chat");
        return res.status(422).send(err.message);
    }
})

router.post('/getUserChats', requireAuth, async (req, res) => {
    var user = req.user;
    userId = user._id;

    try{
        const msgToPipeline = [
          {
            '$match': {
              'to': userId.toString()
            }
          }, {
            '$group': {
              '_id': '$from', 
              'latestMsg': {
                '$max': '$createdAt'
              }, 
              'doc': {
                '$push': '$$ROOT'
              }
            }
          }, {
            '$project': {
              'doc': {
                '$filter': {
                  'input': '$doc', 
                  'as': 'item', 
                  'cond': {
                    '$eq': [
                      '$$item.createdAt', '$latestMsg'
                    ]
                  }
                }
              }, 
              '_id': 0
            }
          }, {
            '$unwind': {
              'path': '$doc'
            }
          }, {
            '$addFields': {
              'from_Id': {
                '$toObjectId': '$doc.from'
              }
            }
          }, {
            '$lookup': {
              'from': 'users', 
              'localField': 'from_Id', 
              'foreignField': '_id', 
              'as': 'toArray'
            }
          }, {
            '$unwind': {
              'path': '$toArray'
            }
          }, {
            '$addFields': {
              'doc.chatParticipant': '$toArray'
            }
          }, {
            '$project': {
              'from_Id': 0, 
              'toArray': 0
            }
          }
        ];

        const msgFromPipeline = [
          {
            '$match': {
              'from': userId.toString()
            }
          }, {
            '$group': {
              '_id': '$to', 
              'latestMsg': {
                '$max': '$createdAt'
              }, 
              'doc': {
                '$push': '$$ROOT'
              }
            }
          }, {
            '$project': {
              'doc': {
                '$filter': {
                  'input': '$doc', 
                  'as': 'item', 
                  'cond': {
                    '$eq': [
                      '$$item.createdAt', '$latestMsg'
                    ]
                  }
                }
              }, 
              '_id': 0
            }
          }, {
            '$unwind': {
              'path': '$doc'
            }
          }, {
            '$addFields': {
              'to_Id': {
                '$toObjectId': '$doc.to'
              }
            }
          }, {
            '$lookup': {
              'from': 'users', 
              'localField': 'to_Id', 
              'foreignField': '_id', 
              'as': 'toArray'
            }
          }, {
            '$unwind': {
              'path': '$toArray'
            }
          }, {
            '$addFields': {
              'doc.chatParticipant': '$toArray'
            }
          }, {
            '$project': {
              'to_Id': 0, 
              'toArray': 0
            }
          }
        ];

        const chatToCursor = Message.aggregate(msgToPipeline);
        const chatFromCursor = Message.aggregate(msgFromPipeline);
        var allChats = [];

        (await chatToCursor).forEach(data => {
            allChats.push(data.doc);
        });

        (await chatFromCursor).forEach(data => {
            allChats.push(data.doc);
        })

        allChats.sort((x,y) => {
            dateOfMsg1 = x.createdAt;
            dateOfMsg2 = y.createdAt;
            return dateOfMsg2 - dateOfMsg1;
        });
        res.send({'chats': allChats});
    }
    catch(err) {
        console.log('error during chats retreival');
        return res.status(422).send(err.message);
    }
})

router.post('/getChatHistory', requireAuth, async (req, res) => {
    const {other} = req.body;

    var user = req.user;
    userId = user._id

    try{
        const chatHistory = await Message.find({
            $or : [{
                to: other,
                from: userId
            }, {
                to: userId,
                from: other
            }]
        }).sort({createdAt: 1});

        if(!chatHistory) {
            return res.status(422).send({error: 'chat history retrieval error'});
        }
        res.send({'chatHistory': chatHistory});
    }
    catch(err) {
        console.log('error during getting chat history');
        return res.status(422).send(err.message);
    }
})

router.post('/setRead', requireAuth, async (req, res) => {
  const {messages} = req.body;
  var msgIds = [];

  messages.forEach(element => {
    msgIds.push(element._id);
  });

  var filter = {
    _id: {$in: msgIds}
  };

  const result = await Message.updateMany(filter, {isRead: true});
})

// todo_pp: later change to just c or something
const convertHubType = (hubType) => {
    if (hubType == 's' || hubType == 'stm') {
        return hubType;
    }
    else if(hubType == 'Scholars Hub'){
        hubType = 's';
    } else{
        hubType = 'stm';
    }
    return hubType;
};


module.exports = router;
