const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    hubType: {
        type: String,
        required:true
    },
    createdBy: { // user_id
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    parentId: {
        type: String
    }
});

postSchema.pre('save', function(next) {
    // do a character limit check on the message here!
    // also be sure to show limit on UI
    const user = this;

    // checked on client too
    if(user.$isEmpty('message'))
    {
        return next(Error('Post cannot be empty'));
    }
    next();
});

mongoose.model('Post', postSchema);
