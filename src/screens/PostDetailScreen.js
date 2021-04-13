import React, {useContext, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import PostInput from '../components/PostInput';
import Post from '../components/Post';
import {getPostRepliesById} from '../helpers/getPostsRelationship';

var parentPost;

const PostDetailScreen = ({navigation}) => {
    const {submitPost, getPosts, state} = useContext(AuthContext);
    const {cPosts, sPosts, firstname, lastname} = state;

    var navState = navigation.state;
    parentPost = navState.params.post;
     
    var firstLetterInName = firstname.charAt(0);
    var hubType = parentPost.hubType;
    var parentId = parentPost._id;

    var inputRef = null;
    var isLoading = false;

    // posts of concern related to the parent post
    var posts = (hubType == 's') ? sPosts : cPosts;
    var replies = getPostRepliesById(parentPost._id, posts);

    // preserve the reply count before adding the parent post
    var replyCount = replies.length;
    replies.unshift(parentPost);

    const constructPostReply = (post) => {
        return (
            <>
            {post.item._id == parentPost._id ?
                <Post post={parentPost} replyCount={replyCount} showInteractiveBar />
                : <Post post={post.item} isComment />
            }
            </>
        );
    }

    const resetInput = () => {
        inputRef.clear();
        inputRef.blur();
    }

    const refreshReplies = async () => {
        console.log('refreshing replies');
        isLoading = true;
        try{
            // this is when someone else makes a comment while the user
            // is on this screen
            await getPosts({hubType});
        }
        catch(err) {
            // todo_log statement
        }
        isLoading = false;
    };

    return(
        <View style={styles.container}>
            <View style={styles.repliesContainer}>
                <FlatList
                    data={replies}
                    renderItem={(item) => constructPostReply(item)}
                    keyExtractor={(item) => item._id}
                    refreshing={isLoading}
                    onRefresh={refreshReplies}
                />
            </View>
            
            <View style={styles.postInputView}>
                <PostInput ref={input => inputRef = input} title={firstLetterInName} placeholder={'Add a comment...'} />
                <TouchableOpacity onPress={() => [submitPost({"value" : inputRef.props.value, hubType, firstname, lastname, 'parentId' : parentId}), resetInput()]}>
                    <Image style={styles.iconStyle} source={require('../img/planeFill_icon.png')} />
                </TouchableOpacity>
            </View>  
        </View>
    )
}

PostDetailScreen.navigationOptions = () => {
    return {
        title: 'Comments',
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
    },
    repliesContainer: {
        marginBottom: 50
    },
    postInputView: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        flexDirection: 'row',
        backgroundColor: 'black',
        opacity: .75,
        width: '100%'
    },
    iconStyle: {
        marginTop: 20, 
        marginLeft: -10
    }
})

export default PostDetailScreen;