import React, {useContext, useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image, FlatList, BackHandler} from 'react-native';
import {Icon, Overlay} from 'react-native-elements';
import PostInput from '../components/PostInput';
import {Context as AuthContext} from '../context/AuthContext';
import Post from '../components/Post';
import {getPostRepliesById} from '../helpers/getPostsRelationship';
import { Switch } from 'react-native-paper';

var hubType;

const ScholarHubScreen = ({navigation}) => {
    const {state, submitPost, getPosts} = useContext(AuthContext);
    const {sPosts} = state;
    const [visible, setVisible] = useState(false);

    // admin related
    const [showOverlay, setShowOverlay] = useState(false);
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    var inputRef = null;
    var isLoading = false;
    
    //var color = '#' + colorGen(); // put this in the parent

    const renderInput = () => {
        setVisible(!visible);
    }

    const isUserAdmin = () => {
        if (isAdmin) {
            // show modal
            setShowOverlay(!showOverlay);
        }
        // continue on as normal
        else{
            submitPost({"value" : inputRef.props.value, hubType, firstname, lastname, isAdmin: isSwitchOn }), renderInput()
        }
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
        console.log('in use effect scholar hubscreen');
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
    }, [visible]);

    const fetchPosts = async () => {
        console.log('running fetchposts from scholar hubscreen');
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
    var firstname = 'Tenaj';
    var lastname = 'Moody';
    var isAdmin = true;

    // keep for now..
    const separator = () => 
    <View style={{
        height: 0,
    }}
    />

    const constructPost = (post) => {
        // we only want posts not replies
        if(post.item.parentId == null) {
            var replies = getPostRepliesById(post.item._id, sPosts);
            return (
                <TouchableOpacity onPress={() => navigation.navigate('PostDetail', {'post' : post.item})}> 
                    <Post post={post.item} replyCount={replies.length} showInteractiveBar />
                </TouchableOpacity>
            );
        }
    };

    const switchToggle = () => {
        // set isAdmin flag on posts
        setIsSwitchOn(!isSwitchOn);
    }

    return (
    <>
        <View style={styles.container}>
            <FlatList
                data={sPosts}
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
                <TouchableOpacity onPress={() => isUserAdmin()}>
                    <Image style={styles.iconStyle} source={require('../img/planeFill_icon.png')} />
                </TouchableOpacity>
            </View>
        }

        {showOverlay ?
            <View style={styles.adminOverlay}>
                <Overlay isVisible={showOverlay}>
                    <View>
                        <View style={styles.adminSwitch}>
                            <Text style={{marginRight: 40, fontSize: 16, color: 'gray'}}> Post as Administrator </Text>
                            <Switch color={'gray'} value={isSwitchOn} onValueChange={switchToggle} />
                        </View>
                        <TouchableOpacity style={styles.adminSend} onPress={() => [submitPost({"value" : inputRef.props.value, hubType, firstname, lastname, isAdmin: isSwitchOn}), setShowOverlay(!showOverlay), renderInput()]}>
                            <Text style={{color: '#2196f3', fontWeight: 'bold', fontSize: 16, marginRight: 5}}> Send </Text>
                            <Image style={{width: 20, height: 20 }} source={require('../img/planeFill_icon.png')} />
                        </TouchableOpacity>
                    </View>
                </Overlay>
            </View> : null
        }
    </> 
    );
};

ScholarHubScreen.navigationOptions = () => {
    hubType = 's';
    
    return {
        title: "Scholars Hub",
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
    },
    adminSwitch: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
    adminSend: {
        alignSelf: 'center',
        flexDirection: 'row'
    }
})

export default ScholarHubScreen;