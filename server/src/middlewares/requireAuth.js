const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
    // automatically downcases header names via express
    const {authorization} = req.headers;

    if(!authorization) {
        return res.status(401).send({error: 'You must be logged in.'});
    }

    const token = authorization.replace('Bearer ', '');
    // place somewhere in s3 bucket or something
    jwt.verify(token, 'MY_SECRET_KEY', async(err, payload) => {
        if(err) {
            return res.status(401).send({error: 'You must be logged in.'});
        }
        const {userId} = payload;
        const user = await User.findById(userId);
        req.user = user;
        next();
    });
};