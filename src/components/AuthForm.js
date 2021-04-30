import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity, Linking} from 'react-native';
import {Text} from 'react-native-elements';
import Spacer from './Spacer';
import {Checkbox} from 'react-native-paper';
import CustomInput from '../components/CustomInput';
import { SafeAreaView } from 'react-navigation';
import InitStyle from '../stylecomponents/InitStyle';


const AuthForm = ({headerText, errorMessage, onSubmit, submitButtonText}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [internalErr, setInternalErr] = useState(null);

    const validate = () => {
        if(headerText === 'Sign up') {
            if(!checked) {
                setInternalErr('You must agree to the consent and confidentiality policy.');
            }
            else if(email === null || email === undefined || email.match(/^ *$/) !== null){
                setInternalErr('Email cannot be blank.')
            }
            else if(password === null || password === undefined || password.match(/^ *$/) !== null){
                setInternalErr('Password cannot be blank.')
            }
            else{
                setInternalErr(null);
                onSubmit({email,password})
            }
        }
        else {
            onSubmit({email,password})
        }
    }

    // todo_pp: later place link somewhere else.
    const openLink =() => {
        Linking.openURL('https://docs.google.com/forms/d/e/1FAIpQLSeLMH0XKjFhA2KANTw-o_W2MHeC1_WVXVtMLYTVB5LSJLfkdQ/viewform?usp=sf_link').catch((err) => {/* todo_log: add statement */});
    }

    return (
        <SafeAreaView forceInset={{top: 'always'}}>
            <View style={InitStyle.textView}>
                <Spacer>
                <Text style={InitStyle.headerText}> {headerText} </Text>
                </Spacer>
                <Spacer>
                    <CustomInput 
                        mode={'outlined'}
                        label={"Email"}
                        value={email}
                        keyboardType={'email-address'}
                        onChangeText={setEmail}
                        style={styles.inputStyle}
                        theme={{colors: {text: 'black', primary: '#2196f3'}}}
                    />
                </Spacer>
                <Spacer> 
                    <CustomInput
                        mode={'outlined'}
                        label={"Password"}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                        style={styles.inputStyle}
                        theme={{colors: {text: 'black', primary: '#2196f3'}}}
                    />
                </Spacer>
                {(headerText === 'Sign up') ?
                <View style={styles.viewStyle}> 
                    <Checkbox color={'#2196f3'} status={checked ? 'checked' : 'unchecked'} onPress={() => {setChecked(!checked)}} />
                    <TouchableOpacity onPress={openLink}>
                        <Text style ={styles.checkboxLabel}>
                                I have agreed to the <Text style={{color: '#2196f3'}}>consent and confidentiality</Text> privacy policy.
                        </Text>
                    </TouchableOpacity>
                </View> : null
                }
                {errorMessage ? <Text style={[InitStyle.errorMessage, {marginLeft: 10, marginRight: 10}]}>{errorMessage}</Text> : null}
                {internalErr ? <Text style={[InitStyle.errorMessage, {marginLeft: 10, marginRight: 10}]}>{internalErr}</Text> : null}
                <Spacer>
                <TouchableOpacity style={InitStyle.button} onPress={() => validate()}>
                    <Text style={InitStyle.buttonText}>
                        {submitButtonText}
                    </Text>
                </TouchableOpacity>
                </Spacer>
            </View>
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    inputStyle: {
        height: 45
    },
    checkboxLabel: {
        fontSize:14,
        marginTop:5,
    },
    viewStyle: {
        flexDirection: 'row',
        marginTop: 5,
        marginRight: 30,
        marginBottom: 10
    }
});

export default AuthForm;