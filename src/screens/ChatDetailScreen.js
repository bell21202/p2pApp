import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, FlatList, Text} from 'react-native';
import { CardStyleInterpolators } from 'react-navigation-stack';
import ChatInput from '../components/ChatInput';
import {Icon} from 'react-native-elements';
import {Context as AuthContext} from '../context/AuthContext';
import moment from 'moment';
import UserAvatar from '../components/UserAvatar';

var userToMessage;
var fLRef;
const ChatDetailScreen = () => {
    const {state, sendChat, getChatHistory} = useContext(AuthContext);
    const {newMessagePub} = state;
    const {userId} = state;
    const [chats, setChats] = useState(null);
    const [newMsgId, setNewMsgId] = useState(null);

    var isLoading = false;
    var inputRef = null;
    var dayOfMsg = null;

    useEffect(() => {
        // incoming new messages
        if (newMessagePub != null) {
            var ofConcern = false;
            if(newMessagePub.to == userId || newMessagePub.from == userId){
                ofConcern = true
            }
            if(ofConcern && newMessagePub._id != newMsgId){
                // get newest chat history
                // wipe out input text too
                inputRef.clear();
                inputRef.blur();

                fetchChatHistory();
                return
            }
            if(!ofConcern || newMessagePub._id == newMsgId){
                return;
            }
        }
        fetchChatHistory();
    }, [newMessagePub]);

    const fetchChatHistory = async () => {

        try{
            // not state var
            var chats = await getChatHistory({'other':userToMessage._id});

            if(newMessagePub != null && newMessagePub._id != newMsgId){
                setNewMsgId(newMessagePub._id);
            }
            setChats(chats);

        } catch(err) {
            // todo_log statement
        }
    }

    const constructChatBubble = (item, index) => {
        var side = 'left';
        var timestamp = moment(item.createdAt).format("hh:mm a");
        var day = moment(item.createdAt).day();
        var showDay = false;

        // day formatting for ui
        if(dayOfMsg != day)
        {
            dayOfMsg = day;
            showDay = true;
        }

        // from 'you'
        if(item.from == userId) {
            side = 'right';
        }
        // from 'them ** Sanity Check **
        else if(item.from === userToMessage._id) {
            side = 'left';
        }

        // TODO: get rid of refresh pull
        // we've reached the end of the rendered flatlist
        //if(index == (chats.length - 1)){
        //    setTimeout(() => {fLRef.scrollToEnd();}, 100);    
        //}

        return (
            <>
                <View style={[styles.chatContainer, (side == 'right') ? {flexDirection: 'row-reverse'} : {flexDirection: 'row'}]}>
                    {(userToMessage.image_url && side == 'left') ? 
                        <UserAvatar sourceimage={userToMessage.image_url} />
                        : 
                        null
                    }
                    {(!userToMessage.image_url && side == 'left') ?
                        <UserAvatar size={35} title={userToMessage.firstname.charAt(0)} />
                        :
                        null
                    }       
                    <View style={[styles.chatBubbleView, (side == 'right') ? {backgroundColor: '#2196f3'} : {backgroundColor: 'gray', marginLeft: 3}]}>
                        <Text style={{color: 'white', fontSize: 15}}> {item.text} </Text>
                    </View>
                    <Text style={{color: 'gray', fontSize: 12, marginBottom: 2}}> {timestamp} </Text>
                </View>

                {/*
                <View style={{alignItems: 'center', marginTop: 10}}>
                    {showDay ? 
                        <Text style={{color: 'gray', fontSize: 12}}>
                            {moment(item.createdAt).format('dddd MMMM Do, YYYY')}
                        </Text> : null
                    }
                </View> 
                */}
            </>
        )
        
    }

    return(
        <View style={styles.container}>
            <View style={styles.chatScreenView}>
                <FlatList ref={ref => fLRef = ref}
                    data={chats}
                    renderItem={({item, index}) => constructChatBubble(item, index)}
                    keyExtractor={(item) => item._id}
                    refreshing={isLoading}
                    onRefresh={fetchChatHistory}
                    onScrollToIndexFailed={()=>{}}
                    inverted={true}
                />
             </View>
            <View style={styles.chatInputView}>
                <ChatInput ref={input => inputRef = input} placeholder={'Type a message'} />
                <TouchableOpacity onPress={() => sendChat({'text' : inputRef.props.value, 'to' : userToMessage._id})}>

                    <Text style={{fontSize: 16, color: '#2196f3'}}>
                        Send
                    </Text>
                    
                </TouchableOpacity>
            </View>
        </View>
    )
};

ChatDetailScreen.navigationOptions = ({navigation}) => {
    var {state} = navigation;
    userToMessage = state.params.userToMessage;

    var firstname = userToMessage.firstname;
    var lastname = userToMessage.lastname;

    return {
        title: firstname + ' ' + lastname,
        headerStyle: {
            backgroundColor: '#2196f3',
        },
        headerTintColor: 'white',

        // slide from right
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#f7f6f6'     
    },
    chatInputView: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        flexDirection: 'row',
        backgroundColor: 'lightgray',
        width: '100%',
        alignItems: 'center',
        borderTopWidth: .25,
        borderTopColor: '#d6d6d6',
    },
    chatBubbleView: {
        borderRadius: 15,
        backgroundColor: 'gray',
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 8,
        paddingLeft: 8,
        maxWidth: '75%',
    },
    chatContainer: {
        marginBottom: 10,
        marginTop: 20,
        marginLeft: 15,
        marginRight: 10,
        alignItems: 'flex-end',
    },
    chatScreenView: {
        height: '90%'
    }
})

export default ChatDetailScreen;