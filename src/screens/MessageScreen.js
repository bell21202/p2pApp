import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import ChatScreen from './ChatScreen';
import ContactsScreen from './ContactsScreen';

const MessageScreen = ({navigation}) => {
    const [tabSelect, setTabSelect] = useState('ConvoTab');

    return (
        <View style={styles.container}>
            <View style={styles.tabView}> 
                <TouchableOpacity onPress={() => {setTabSelect('ConvoTab')}}> 
                    <Text style={(tabSelect == 'ConvoTab') ? styles.selectedTab : styles.tabText}> Conversations  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {setTabSelect("ContactTab")}}>
                    <Text style={(tabSelect == 'ContactTab') ? styles.selectedTab : styles.tabText}> Contacts </Text>
                </TouchableOpacity>           
            </View>
            <View style={styles.viewPanel}>
                {(tabSelect == 'ConvoTab') ? <ChatScreen /> : <ContactsScreen nav={navigation} /> }   
            </View>
        </View>
    );
}

MessageScreen.navigationOptions = () => {
    return {
        title: 'Messages',
        headerTitleAlign: 'center',
        headerStyle: {
            backgroundColor: '#2196f3',   
        },
        headerTintColor: 'white',
    }
};

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
    }, 
    headerText: {
        alignSelf: 'center',
        fontSize: 24,
        marginBottom: 30,
    },
    tabView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    tabText: {    
        fontSize: 16,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 25,
        paddingRight: 25,
        color: '#606060'
    },
    selectedTab: {
        borderColor: '#2196f3',
        borderWidth: .75,
        borderRadius: 20,
        fontSize: 16,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 25,
        paddingRight: 25,
        color: '#2196f3',
        borderStyle: 'dotted'
    },
    viewPanel: {
        marginTop: 15,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 20,
        alignContent: 'space-around',
        height: '90%',
        padding: 5
    }
})

export default MessageScreen;