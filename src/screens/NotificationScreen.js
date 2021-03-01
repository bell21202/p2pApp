import React, {useContext, useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Notification from '../components/Notification';
import {Context as AuthContext} from '../context/AuthContext';


const NotificationScreen = () => {
    const {state, getPosts} = useContext(AuthContext);
    const {posts} = state;

    var isLoading = false;

    useEffect(() => {
        console.log('in use effect ns'); 
        fetchAdminPosts();
    }, []);

    const fetchAdminPosts = async () => {
        isLoading = true;
        try{
            await getPosts({'hubType':''});
        }
        catch(err) {
            console.log("error in fetch posts"); // change later
        }
        isLoading = false;
    }

    const constructNotification = (post) => {
        return (
            <Notification post={post.item} />
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={posts}
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