import React, {useState, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import CustomInput from '../components/CustomInput';
import Spacer from '../components/Spacer';
import InitStyle from '../stylecomponents/InitStyle';
import {Context as AuthContext} from '../context/AuthContext';

var nav;
const ChangePasswordScreen = () => {
    const {state, changePassword} = useContext(AuthContext);
    const {errorMessage} = state;
    const [internalErr, setInternalErr] = useState(null);
    const [newPass, setNewPass] = useState(null);
    const [confirmNewPass, setConfirmNewPass] = useState(null);
    const [oldPass, setOldPass] = useState(null);

    const validate = () => {
        // make sure they're identical
        if(newPass === null || confirmNewPass === null || newPass.match(/^ *$/) !== null || confirmNewPass.match(/^ *$/) !== null )
        {
            setInternalErr('Password can not be empty.');
        }
        else if(newPass != confirmNewPass) 
        {   
            setInternalErr('Passwords do not match. Please make sure the new passwords are identical.')
        }
        else {
            setInternalErr('');
            changePassword({oldPass, newPass, navigation: nav});
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerText}> 
                <Text style={{fontSize: 20, color:'#2196f3'}}> Change password </Text>
            </View>
            <CustomInput
                mode={'outlined'}
                label={"Current Password"}
                value={oldPass}
                onChangeText={setOldPass}
                secureTextEntry={true}
                style={styles.inputStyle}
                theme={{colors: {text: 'black', primary: '#2196f3'}}}
            />
            <Spacer />
                <CustomInput
                mode={'outlined'}
                label={"New Password"}
                value={newPass}
                onChangeText={setNewPass}
                secureTextEntry={true}
                style={styles.inputStyle}
                theme={{colors: {text: 'black', primary: '#2196f3'}}}
                />
            <Spacer />
                <CustomInput
                mode={'outlined'}
                label={"Confirm New Password"}
                value={confirmNewPass}
                onChangeText={setConfirmNewPass}
                secureTextEntry={true}
                style={styles.inputStyle}
                theme={{colors: {text: 'black', primary: '#2196f3'}}}
                />
            <Spacer />

            {errorMessage ?
            <View>
                <Text style={InitStyle.errorMessage}>{errorMessage}</Text>
                <Spacer />
                <Spacer />
            </View>  : null
            }
            {internalErr ?
             <View>
                <Text style={InitStyle.errorMessage}>{internalErr}</Text>
                <Spacer />
                <Spacer />
            </View> : null
            }
            <TouchableOpacity style={InitStyle.button} onPress={() => validate()}>
                <Text style={InitStyle.buttonText}>
                    Save
                </Text>
            </TouchableOpacity>
        </View>
    )
};

ChangePasswordScreen.navigationOptions = ({navigation}) => {
    var {state} = navigation;
    nav = state.params.nav;

    return {
        title: "Edit Profile",
        headerTitleAlign: 'center',
        headerStyle: {
            backgroundColor: '#2196f3'
        },
        headerTintColor: 'white'
    }
}

const styles = StyleSheet.create({
    container: {
        marginLeft: 50,
        marginRight: 50,
        marginTop: '10%',

    }, 
    inputStyle: {
        height: 45
    },
    headerText: {
        alignSelf: 'center',
        marginBottom: 10
    }
})

export default ChangePasswordScreen;