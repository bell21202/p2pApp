import React, {useContext, useState} from 'react';
import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import PostInput from '../components/PostInput';
import Post from '../components/Post';
import {getPostRepliesById} from '../helpers/getPostsRelationship';
import {Icon} from 'react-native-elements';

var parentPost;

const PostDetailScreen = ({navigation}) => {
    const {submitPost, getPosts, state} = useContext(AuthContext);
    const {cPosts, sPosts, firstname, lastname} = state;

    parentPost = navigation.state.params.post;

    var firstLetterInName = firstname.charAt(0);
    var hubType = parentPost.hubType;
    var parentId = parentPost._id;

    var inputRef = null;
    var isLoading = false;
    var replyCount;
    var replies;

    const fetchPostOfInterest = async () => {
        try {
            await getPosts({hubType})
        }
        catch(err){
            // todo_log statement
        }
    };

    if(hubType == 's') {
        if(sPosts == null) {
            fetchPostOfInterest();
        } else{
            replies = getPostRepliesById(parentPost._id, sPosts);
            replyCount = replies.length;
            replies.unshift(parentPost);
        }
    }
    else if(hubType == 'stm') {
        if(cPosts == null){
            fetchPostOfInterest();
        } else {
            replies = getPostRepliesById(parentPost._id, cPosts);
            replyCount = replies.length;
            replies.unshift(parentPost);
        }
    }

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
        isLoading = true;
        try{
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
                    <Icon name="paper-plane" type='font-awesome' color={'#2196f3'} containerStyle={{marginLeft: 5}} />
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
        backgroundColor: 'lightgray',
        width: '100%',
        alignItems: 'center',
    },
    iconStyle: {
        marginTop: 20, 
        marginLeft: -10
    }
})

export default PostDetailScreen;