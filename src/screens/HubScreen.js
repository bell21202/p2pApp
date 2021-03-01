import React, {useContext, useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, FlatList, BackHandler} from 'react-native';
import {Icon} from 'react-native-elements';
import PostInput from '../components/PostInput';
import {Context as AuthContext} from '../context/AuthContext';
import Post from '../components/Post';
import {getPostRepliesById} from '../helpers/getPostsRelationship';

var hubType;

const HubScreen = ({navigation}) => {
    const {state, submitPost, getPosts} = useContext(AuthContext);
    const {posts} = state;
    
    const [visible, setVisible] = useState(false);
   
    var inputRef = null;
    var isLoading = false;

    //console.log('rendering in hubscreen');
    
    //var color = '#' + colorGen(); // put this in the parent

    const renderInput = () => {
        setVisible(!visible);
    }

    // grab the backwards navigation for a sec..
    const backNavigation = () => {
        if (inputRef != null)
        {
            inputRef.blur();
            setVisible(!visible);
            return true;
        }
    }

    useEffect(() => {
        console.log('in use effect hubscreen');
        BackHandler.addEventListener('hardwareBackPress', backNavigation);
        if (inputRef != null) {
            inputRef.focus();
        } else {
            fetchPosts();
        }
        // prevents memory leak
        return function cleanup() {
            BackHandler.removeEventListener('hardwareBackPress', backNavigation);
        }
    }, [visible]); // todo: come back to this, do we need to run use effect so much??

    const fetchPosts = async () => {
        console.log('running fetchposts');
        isLoading = true;

        try {
            console.log('before');
            await getPosts({hubType});
        }
        catch(err) {
            console.log("error in fetch posts"); // change later
        }
        isLoading = false;
    };

    // get rid of later 
    var firstLetterInName = 'T'; // from current user!!

    //var posts = [{'message':'Lets make this look like a real message with real words and not just gibberish.', '_id': 'i', 'firstname': 'Stanley', 'lastname': 'Adrisse'}, {'message':'Lets make this look like a real message with real words and not just gibberish.', '_id': 'j', 'firstname': 'Tenaj', 'lastname': 'Moody'}, {'message':'Lets make this look like a real message with real words and not just gibberish.', '_id': 'p', 'firstname': 'Spence', 'lastname': 'Anderson'}];
    var firstname = 'Tenaj';
    var lastname = 'Moody';

    // keep for now..
    const separator = () => 
    <View style={{
        height: 0,
    }}
    />

    const constructPost = (post) => {
        // we only want posts not replies
        if(post.item.parentId == null) {
            var replies = getPostRepliesById(post.item._id, posts);
            return (
                <TouchableOpacity onPress={() => navigation.navigate('PostDetail', {'post' : post.item})}> 
                    <Post post={post.item} replyCount={replies.length} showInteractiveBar />
                </TouchableOpacity>
            );
        }
    };

    return (
    <>
        <View style={styles.container}>
            <FlatList
                data={posts}
                renderItem={(item) => constructPost(item)}
                keyExtractor={(item) => item._id}
                refreshing={isLoading}
                onRefresh={fetchPosts}
                ItemSeparatorComponent={() => separator()}
            />
        </View>
         
        {!visible ?
            <Icon
                raised
                name='edit'
                type='font-awesome'
                color='#2196f3'
                reverse
                size={26}
                containerStyle={styles.postInitButtonView}
                onPress={() => {renderInput()}}
            /> :
            <View style={[styles.postInputView, visible ? {width: '100%'} : {width: '0'}]}> 
                <PostInput ref={input  => inputRef = input} title={firstLetterInName} placeholder={'Add a post'} />
                <TouchableOpacity onPress={() => [submitPost({"value" : inputRef.props.value, hubType, firstname, lastname }), renderInput()]}>
                    <Image style={styles.iconStyle} source={require('../img/planeFill_icon.png')} />
                </TouchableOpacity>
            </View>
        }
    </> 
    );
};

HubScreen.navigationOptions = ({navigation}) => {
    var {state} = navigation;
    title = state.params.hubTitle;
    hubType = title;
    
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
        height: '100%'
    },

    postInitButtonView: {
        position: 'absolute',
        bottom: 0,
        right: 10
    },

    postInputView: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        flexDirection: 'row',
        backgroundColor: 'black',
        opacity: .75 
    },
    iconStyle: {
        marginTop: 20, 
        marginLeft: -10
    }
})

export default HubScreen;