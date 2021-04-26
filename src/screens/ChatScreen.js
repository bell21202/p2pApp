import React, {useState, useContext, useEffect} from 'react';
import {Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import UserAvatar from '../components/UserAvatar';
import moment from 'moment';
import {Badge} from 'react-native-elements';

const ChatScreen = ({nav}) => {
    const {state, getUserChats} = useContext(AuthContext);
    const {newMessagePub, userId} = state;
    const [userChats, setUserChats] = useState(null);
    const [newMsgId, setNewMsgId] = useState(null);

    var isLoading = false;

    useEffect(() => {
        var ofConcern = false;
        if(newMessagePub != null)
        {
            // someone sent a message to 'you'
            if(newMessagePub.to == userId){
                ofConcern = true;
            }
            if(ofConcern && newMessagePub._id != newMsgId)
            {
                fetchUserChats();
                return
            }
            // if it's not to 'me' or we already processed it don't refresh
            if(!ofConcern || newMessagePub._id == newMsgId)
            {
                return;
            }
        }

        fetchUserChats();
    }, [newMessagePub]);

    const fetchUserChats = async () => {
        try{
            var chats = await getUserChats();
            var consolidatedChats = [];
            var msgNames = new Set();

            // consolidate
            chats.forEach(element => {
                var chatParticipant = element.chatParticipant;
                var fname = chatParticipant.firstname;
                var lname = chatParticipant.lastname;
                if(!msgNames.has(fname+lname)){
                    msgNames.add(fname+lname);
                    consolidatedChats.push(element);
                }
            });

            if(newMessagePub != null && newMessagePub._id != newMsgId){
                setNewMsgId(newMessagePub._id);
            }
            setUserChats(consolidatedChats);
        } catch(err) {
            // todo_log statement
        }
    }

    const constructUserChat = (chatMessage) => {
        // todo_pp: case of somebody editing their profile while a user sends a mesage
        // to this person, null checks for empty values
        var participant = chatMessage.item.chatParticipant;
        var fname = participant.firstname;
        var lname = participant.lastname;
        var firstLetter = fname.charAt(0);

        var timestamp;
        var now = moment(Date.now());
        var createdTime = moment(chatMessage.item.createdAt);
        var startOfDay = moment.duration(moment().startOf('day').fromNow());

        // is read property for messages sent to 'me'
        var isRead = true;
        if(chatMessage.item.to == userId){
            isRead = chatMessage.item.isRead;
        }

        // msg was sent today
        if((now.diff(createdTime, 'hours')) <= startOfDay.hours())
        {
            timestamp = createdTime.format('LT');
        }
        else{
            timestamp = createdTime.format('MMM D');
        }
        return (
            <View style={styles.chatContainer}>
                <TouchableOpacity onPress={() => nav.navigate('ContactDetail', {'user' : participant})}>
                    <UserAvatar containerStyle={styles.contactAvatar} size={40} title={firstLetter} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.outerView} onPress={() => nav.navigate('ChatDetail', {'userToMessage' : participant})}>
                    <View style={styles.innerView}>
                        <Text style={{fontSize: 16}}>{fname} {lname}</Text>
                        <Text style={{fontSize: 13, color: 'gray', maxHeight: '60%'}}>{chatMessage.item.text}</Text>
                    </View>
                    <View style={styles.timestamp}>
                        <Text style={{fontSize: 12, color: 'gray'}}>
                            {timestamp}
                        </Text>
                        {!isRead ? <Badge status='primary' badgeStyle={{width: 15, height:15, borderRadius: 10, marginTop: 5}}/> : null }
                    </View>
                </TouchableOpacity>
            </View>
        )
    };

    return (
        <View>
            <FlatList
                data={userChats}
                renderItem={(item) => constructUserChat(item)}
                keyExtractor={(item) => item._id}
                refreshing={isLoading} // --> ??
                onRefresh={fetchUserChats}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    chatContainer: {
        backgroundColor: 'white',
        borderRadius: 0,
        borderRadius: 10,
        marginBottom: 2,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 5,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: 90,
        alignItems: 'center',
        borderBottomColor: 'gray',
        borderBottomWidth: .25,
    },
    contactAvatar: {
        marginRight: 5,
    },
    outerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    innerView: {
        width: '60%',
        maxHeight: 55,
    },
    timestamp: {
        alignItems: 'baseline',
        width:'20%',
        alignItems: 'flex-end'
    }
});

export default ChatScreen;