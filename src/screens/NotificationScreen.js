import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import Notification from '../components/Notification';
import {Context as AuthContext} from '../context/AuthContext';

const NotificationScreen = ({navigation}) => {
    const {state, getAdminPosts} = useContext(AuthContext);
    const {adminPosts} = state;

    var isLoading = false;

    useEffect(() => {
        fetchAdminPosts();
    }, []);

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