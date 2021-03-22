const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const requireAuth = require('../middlewares/requireAuth');
const User = mongoose.model('User');
const Post = mongoose.model('Post');

const router = express.Router();

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
        });

        res.send({"user" : user}); // send the user back
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
        res.status(200).send('completed'); // todo: make into constant values
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
