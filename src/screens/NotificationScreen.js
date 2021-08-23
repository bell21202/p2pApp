import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Alert, AppState, Linking, Platform} from 'react-native';
import Notification from '../components/Notification';
import {Context as AuthContext} from '../context/AuthContext';
import registerForPushNotificationsAsync, {hasPermission} from '../helpers/registerForPushNotificationsAsync';


const NotificationScreen = ({navigation}) => {
    const {state, getAdminPosts, savePushToken} = useContext(AuthContext);
    const {adminPosts} = state;

    var isLoading = false;

    useEffect(() => {
        fetchAdminPosts();

        // set up push notifications
        registerToken();
        AppState.addEventListener('change', handleAppStateChange);
        return () => {
            AppState.removeEventListener('change', handleAppStateChange);
        }
    }, []);

    const handleAppStateChange = async nextState => {
        if(nextState === 'active') {
            const permission = await hasPermission();
            if (permission) {
                const token = await registerForPushNotificationsAsync();
                if(token) {
                    savePushToken({token});
                }
            }
        }
    }

    const registerToken = async () => {
        try{
            const permission = await hasPermission();
            if(!permission) {
                Alert.alert( "Prison-to-Professionals would like to send you notifications?", "This can be configured later in the settings.", [
                    {text: "Not Now", onPress: () => {}, },
                    {text: "OK", onPress: () => Platform.OS === 'ios' ? Linking.openURL('app-settings:') : Linking.openSettings()},
                ], {cancelable: true});
            }
            else {
                const token = await registerForPushNotificationsAsync();
                if(token) {
                    savePushToken({token});
                }
            }
        } catch(err) {
            // todo_log statement
        }
    }

    const fetchAdminPosts = async () => {
        isLoading = true;
        try{
            await getAdminPosts({});
        }
        catch(err) {
            // todo_log statement
        }
        isLoading = false;
    }

    const constructNotification = (post) => {
        // only show the administrative post on this screen
        if(post.item.isAdmin) {
            return (
                <TouchableOpacity onPress={() => navigation.navigate('PostDetail', {'post' : post.item})}>
                    <Notification post={post.item} />
                </TouchableOpacity>
            );
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={adminPosts}
                renderItem={(item) => constructNotification(item)}
                keyExtractor={(item) => item._id}
                refreshing={isLoading}
                onRefresh={fetchAdminPosts}  
            />
        </View>
     );
};


NotificationScreen.navigationOptions = ({navigation}) => {
    var {state} = navigation;
    title = state.routeName;

    return {
        title: title,
        headerTitleAlign: 'center',
        headerStyle: {
            backgroundColor: '#2196f3',   
        },
        headerTintColor: 'white',
    }
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ebebeb',
        height: '100%',
        marginTop: 5
    }
});

export default NotificationScreen;