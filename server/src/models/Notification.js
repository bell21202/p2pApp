const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    pushNotificationToken: {
        type: String,
        required: true
    }
});

mongoose.model('Notification', notificationSchema);