import React from 'react';
import {Avatar} from 'react-native-elements';
import {View, Text, StyleSheet, Image} from 'react-native';
import moment from 'moment';

const Post = ({post, replyCount, showInteractiveBar, isComment}) => {
    
    var firstLetterTitle = post.firstname.charAt(0);
    var createdDate = moment(post.createdAt).fromNow();
    var isAdminPost = post.isAdmin;

    return (
        <>
        <View style={[!isComment ? styles.container : styles.replyContainer]}>
            <View style = {[!isComment ? styles.header : styles.replyHeader]}>
                
                {!isAdminPost ?
                     <Avatar
                        rounded
                        size={48}
                        title={firstLetterTitle}
                        //source={require("../img/unnamed.png")}
                        placeholderStyle={{ backgroundColor: 'transparent' }}
                        overlayContainerStyle={{backgroundColor: 'gray'}}
                    /> :
                    <Avatar
                        rounded
                        size={48}
                        source={require("../img/mainlogo_white.jpg")}
                        placeholderStyle={{ backgroundColor: 'transparent' }}
                        overlayContainerStyle={{backgroundColor: 'white', borderColor: '#d6d6d6', borderWidth: 1}}
                    />
                }
                <View style={styles.headerDetail}>
                    {!isAdminPost ?
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>
                            {post.firstname} {post.lastname}
                        </Text> :
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>
                            P2P
                        </Text>
                    }
                    {!isComment ?
                        <Text style={{color: 'gray'}}>
                            {createdDate}
                        </Text> : null
                    }       
                </View> 
            </View>
            <View>
                <Text style={[!isComment ? styles.message : styles.replyMessage]}>{post.message}</Text>
                {isComment ?
                    <Text style={{color: 'gray', marginLeft: '20%'}}>
                        {createdDate}
                    </Text> : null
                }
            </View>

            {showInteractiveBar ?
                <View style={styles.interactiveBar}>
                <Image style={styles.interactiveImage} source={require('../img/comment_icon.png')}/>
                    <Text style={{color: '#7a7a7a'}}> {replyCount} </Text>
                </View> : null
            }
            {(replyCount > 0) ?
                <Text style={styles.commentText}>{replyCount} replies</Text>
                :
                null
            }
        </View>
       
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        borderRadius: 10,
        margin: 10,
        borderBottomColor: '#606060',
        borderColor: '#ebebeb',
        borderWidth: .75,
        borderBottomWidth: .5,
        backgroundColor: 'white',
        //maxHeight: 275
    },
    replyContainer: {
        padding: 15,
        borderRadius: 5,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
        borderColor: '#2196f3',
        borderWidth: .2,
        borderBottomWidth: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        marginBottom: 20
    },
    replyHeader: {
        flexDirection: 'row',
    },
    headerDetail: {
        marginTop: 5,
        marginLeft: 15,
        //backgroundColor: 'blue'
    },
    interactiveBar: {
        marginTop: 15,
        flexDirection: 'row',
        marginBottom: 10
    },
    commentText: {
        color: '#2196f3',  
        fontWeight: 'bold',
    },
    interactiveImage: {
        marginTop: 2
    },
    message: {
        fontSize: 16,
        //backgroundColor: 'blue'
    },
    replyMessage: {
        fontSize: 16,
        marginLeft: '20%',
        marginTop: -20,
        //backgroundColor: 'green'
    }
})

export default Post;