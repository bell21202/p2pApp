const {Expo} = require('expo-server-sdk');

var expo = new Expo();
var tickets = [];

module.exports = (notifications) => {
    var validNotifications = [];

    notifications.forEach(element => {
        var pushToken = element.to;
        // make sure tokens are valid and they should be
        if(Expo.isExpoPushToken(pushToken)) {
            validNotifications.push(element);
        }else {
            // todo_log add statement
        }
    });
    // batch and compress
    var chunks = expo.chunkPushNotifications(validNotifications);
    (async () => {
        for (var chunk of chunks) {
        try{
            var ticketChunk = await expo.sendPushNotificationsAsync(chunk); // send them
            // console.log(ticketChunk);
            // todo_log: add statement
            tickets.push(...ticketChunk);
        }catch(err) {
            // todo_log: add statement
        }
    }
    })();
};
