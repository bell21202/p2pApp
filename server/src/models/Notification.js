const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    pushNotificationToken: {
        type: String,
        required: true
    },
    settings: {
        type: Object,
    }
});

mongoose.model('Notification', notificationSchema);