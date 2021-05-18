import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { Platform} from 'react-native';

export default async() => {
    const token = (await Notifications.getExpoPushTokenAsync()).data;
    return token;
}

// this seems to be a thing that has to happen regardless of status?? before succesfully sending??
export const hasPermission = async () => {
    if (Constants.isDevice) {
        const {status: existingStatus} = await Notifications.getPermissionsAsync();
        var finalStatus = existingStatus;
    } else {
        // todo_log: add statement
        console.log('must be on physical device');
        return false;
    }
    if(Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }
    if(finalStatus !== 'granted'){
        return false;
    }
    return true;
}