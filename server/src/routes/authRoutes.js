const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = mongoose.model('User');
const requireAuth = require('../middlewares/requireAuth');

const router = express.Router();

router.post('/signup', async (req,res) => {
    const {email, password} = req.body;
    try
    {
        // good to have
        //User.collection.deleteMany({});
        //User.collection.dropIndex('');

        const user = new User({email,password});
        await user.save();

        // at this point we have the _id from the db
        const token = jwt.sign({userId: user._id},'MY_SECRET_KEY'); // place somewhere in s3 bucket or something
        res.send({"token" : token, "user" : user});
    } 
    catch (err) {
       return res.status(422).send(err.message);
    }
});

router.post('/signin', async (req,res) => {
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(422).send({error: 'Must provide email and password'});
    }

    // ..take a little time
    const user = await User.findOne({email});
    if(!user) {
        return res.status(422).send({error: 'Invalid password or email'});
    }

    try {
        await user.comparePassword(password);
        const token = jwt.sign({userId: user._id},'MY_SECRET_KEY'); // place somewhere in s3 bucket or something
        res.send({"token" : token, "user" : user});
    } catch(err) {
        // todo_log: add statement
        // console.log('password check did not pass');
        return res.status(422).send({error: 'Invalid password or email'});
    }
});

router.post('/autoLogin', requireAuth, async (req,res) => {
    var user = req.user;
    try{
        res.send({"user" : user});
    } catch(err) {
        // todo_log: add statement
        // console.log('autologin failed');
        return res.status(422).send({error: 'Failed to autologin'});
    }
});

module.exports = router;