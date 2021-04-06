import React from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import { CardStyleInterpolators } from 'react-navigation-stack';
import UserAvatar from '../components/UserAvatar';
import memTypeConverter from '../helpers/memTypeConverter';
import moment from 'moment';
import { TouchableOpacity } from 'react-native';

var user;
const ContactDetailScreen = ({navigation}) => {

    var type = memTypeConverter(user.memberType);
    var mem = [];
    formatConverter(type, mem);

    var firstname = user.firstname;
    var lastname = user.lastname;
    var memberType = mem.toString().replace(","," + ");

    return(
        <View style={{marginTop: 10}}> 
        <View style={styles.container}> 
            <View style={styles.contactAvatar}>
            {user.image_url ? 
                <UserAvatar sourceimage={user.image_url} />
                :
                <UserAvatar size={'large'} title={user.firstname.charAt(0)} /> 
            }
            </View>
            <View style={styles.contactInfo}>
                <Text style={styles.contactName}> {firstname} {lastname} </Text>
                <View style={styles.contactDetails}>
                    <Text style={styles.detailHeader}> Member Type: </Text>
                    <Text style={{fontSize: 16}}>{memberType}</Text>
                </View>
                {user.cohortDate ? 
                    <View style={styles.contactDetails}>
                        <Text style={styles.detailHeader}> Graduation Year: </Text>
                        <Text style={{fontSize: 16}}>{moment(user.cohortDate).calendar()}</Text>
                    </View> : null
                }
            </View>
        </View>
        <TouchableOpacity onPress={() => [navigation.navigate('ChatDetail', {'userToMessage' : user})]}>
            <View style={styles.subContainer}>
                <Text style={{fontSize: 16, color: '#606060'}}> Message </Text>
                <Image style={styles.icon} source={require('../img/chat_blueicon.png')} />
            </View>
        </TouchableOpacity>
        </View>
    )
};

// todo: put in helper location
const formatConverter = (type, mem) => {
    if(type.tutor)
    {
        mem.push("Tutor");
    }
    if(type.mentor)
    {
        mem.push("Mentor");
    }
    if(type.scholar)
    {
        mem.push("Scholar");
    }
};

ContactDetailScreen.navigationOptions = ({navigation}) => {
    var {state} = navigation;
    user = state.params.user;

    return {
        title: '',
        headerTitleAlign: 'center',
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
        marginTop: '15%',
        borderColor: 'white',
        borderWidth: .75,
        marginRight:'5%',
        marginLeft: '5%',
        padding: 30,
        borderRadius: 40,
        backgroundColor: 'white'
    },
    subContainer: {
        borderRadius: 40,
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: .75,
        marginRight:'5%',
        marginLeft: '5%',
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20
    },
    contactAvatar: {
        alignItems: 'center',
        marginTop: -60
    },
    contactInfo: {
        alignItems: 'center',
        marginTop: 15,
    },
    contactName: {
        fontSize: 25
    },
    contactDetails: {
        flexDirection: 'row',
        marginTop: 5,
        alignItems: 'center'
    },
    detailHeader: {
        color: 'gray',
        marginRight: 5,
    },
    icon: {
        alignSelf: 'center',
        height: 20,
        width: 20
    }
});

export default ContactDetailScreen;