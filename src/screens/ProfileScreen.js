import React, {useContext, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, Overlay} from 'react-native-elements';
import {Context as AuthContext} from '../context/AuthContext';
import Spacer from '../components/Spacer';
import DisplayProfileForm from '../components/DisplayProfileForm';
import memberHelper, {formatConverter} from '../helpers/memTypeConverter';
import moment from 'moment';

const ProfileScreen = ({navigation}) => {
    const {state} = useContext(AuthContext);
    const {firstname, lastname, email, cohortDate, memberType} = state;
    const [visible, setVisible] = useState(false);

    var type = memberHelper(memberType);
    var mem = [];

    formatConverter(type, mem);
    var memberT = mem.toString().replace(/,/g," + "); // not sure about this regex here!

    return (
    <View>
        <View style={styles.headerView}>
            <Spacer> 
            <Avatar
                rounded
                icon={{name: 'camera', type: 'font-awesome'}}
                overlayContainerStyle={{backgroundColor: 'lightgray'}}
                size={'large'}
            />
            </Spacer>
        </View>
        <View style={styles.headerName}>
            <Text style={{fontSize: 18, color: '#606060'}}> {firstname} </Text>
        </View>
        <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={() => navigation.navigate('EditProfile')}> Edit Profile </Text>
        </TouchableOpacity>
        <View style={styles.displayInputView}>
            <DisplayProfileForm
                firstname={firstname}
                lastname={lastname}
                email={email}
                // do conversions for types
                membertype={memberT}
                gradyear={cohortDate ? moment(cohortDate).calendar() : null}
            />
        </View>
        <TouchableOpacity onPress={() => setVisible(!visible)}>
            <Text style={{color: '#aaaaaa', marginTop: '40%', alignSelf: 'center', fontSize: 16}}>Sign Out</Text>
        </TouchableOpacity>
        <Overlay overlayStyle={styles.overlay} isVisible={visible} onBackdropPress={() => setVisible(!visible)}>
            <View>
                <Text style={{color: 'black', fontSize: 18}}>Sign Out</Text>
                <Text style={{color: 'black', marginTop: 20}}>Are you sure you want to logout?</Text>
                <View style={{flexDirection: 'row', width: '70%', alignSelf: 'flex-end', marginTop: 30}}>
                    <TouchableOpacity style={styles.modalButton} onPress={() => signout({})}>
                        <Text style={{color: 'white'}}>Log Out</Text>
                    </TouchableOpacity>
                    <Spacer />
                    <TouchableOpacity style={styles.modalButton} onPress={() => setVisible(!visible)}>
                        <Text style={{color: 'white'}}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Overlay>
    </View>

    );
}

ProfileScreen.navigationOptions = ({navigation}) => {
    var {state} = navigation;
    title = state.routeName;

    // title = state.params.hubTitle; why doesn't this work..
    
    return {
        title: title,
        headerTitleAlign: 'center',
        headerStyle: {
            backgroundColor: '#2196f3'
        },
        headerTintColor: 'white'
    }
};

const styles = StyleSheet.create({
    headerView: {
        alignItems: 'center',
        marginTop: '10%'
    },
    headerName: {
        alignSelf: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: '#2196f3',
        fontWeight: 'bold'
    },
    button: {
        alignItems: 'center',
        borderRadius: 5,
        borderWidth: 1,
        borderColor:'#2196f3',
        padding: 5,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 15
    },
    displayInputView: {
        marginLeft: 50,
        marginRight: 50,
        marginTop: 15
    },
    overlay: {
        width: '80%',
        height: 160,
        marginLeft: 30,
        marginRight: 20,
        borderRadius: 5,
        padding: 15,
        opacity: .75
    },
    modalButton: {
        backgroundColor: '#2196f3',
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 5
    }
});

export default ProfileScreen;