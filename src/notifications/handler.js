import {useEffect} from 'react';
import * as Notifications from 'expo-notifications';
import {navigate} from '../navigationRef';


export default() => {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: true,
        }),
        handleError: () => {
            //todo_log: add statement
        },
    });

    useEffect(() => {
        // listen for responses
        const subscription = Notifications.addNotificationResponseReceivedListener(response => {
            var object =  response.notification.request.content.data;
            // this must be a chat message
            if(!object.hubType)
            {
                handleChatMessage(object);
            } else {
                handlePost(object);
            }
        })
        return function cleanup() {
            subscription.remove();
        }
    }, []);

    const handlePost = (obj) => {
        if(navigate) {
            navigate('PostDetail', {'post' : obj});
        }
    }

    const handleChatMessage = (obj) => {
        if(navigate) {
            navigate('ChatDetail', {'userToMessage' : obj});
        }
    }

}
