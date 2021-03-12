const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String
    },
    memberType: {
        type: String
    },
    cohortDate: {
        type: Date
    },
    isAdmin: {
        type: Boolean
    }
});

// pre-save hook
userSchema.pre('save', function(next) {
    const user = this;

    // no changes to the password
    if(!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);   
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
            if(err) {
                return next(err);
            }
            user.password = hash;
            next();
        });
    });
});

// pre-update hook
userSchema.pre('findOneAndUpdate',  function(next) {
    const userJson = this._update;

    // sanity check, validated on client side
    if(!userJson.password)
    {
        return next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            return next(err);   
        }
        bcrypt.hash(userJson.password, salt, (err, hash) => {
            if(err) {
                return next(err);
            }
            userJson.password = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function(password) {
    const user = this;
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                return reject(err);
            }
            // if the passwords don't match
            if (!isMatch) {
                return reject(false);
            }
            resolve(true);
        });
    });
}

mongoose.model('User', userSchema);