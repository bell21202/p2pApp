import React from 'react';
import {Avatar} from 'react-native-elements';
import {View, Text, StyleSheet, Image} from 'react-native';
import moment from 'moment';

const Notification = ({post}) => {

    var createdDate = moment(post.createdAt).fromNow();

    const convertHubType = (hubType) => {
        if (hubType == 's') {
            return 'Scholars Hub';
        } else if (hubType == 'stm') {
            return 'Community Hub';
        }
    }

    var hubType = convertHubType(post.hubType);

    return (
        <>
        <View style={styles.container}>
            <View style = {styles.header}>
                <Avatar
                    rounded
                    size={50}
                    source={require("../img/mainlogo_white.jpg")}
                    placeholderStyle={{ backgroundColor: 'transparent' }}
                    overlayContainerStyle={{backgroundColor: 'white', borderColor: '#d6d6d6', borderWidth: 1}}
                />
                <View style={styles.headerDetail}>
                    <Text style={{fontSize: 16}}>
                       P2P posted in {hubType}
                    </Text>         
                    <Text style={{color: 'gray'}}>
                        {createdDate}
                    </Text>      
                </View> 
            </View>
        </View>
       
        </>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5,
        borderColor: '#606060',
        borderWidth: .2,
        borderBottomWidth: 1,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        marginBottom: 20
    },
    headerDetail: {
        marginTop: 5,
        marginLeft: 15,
    }
})

export default Notification;