import React, {useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
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
                    <Text style ={styles.checkboxLabel}>
                            I agree to the consent and confidentiality privacy policy. 
                    </Text>
                </View> : null
                }
                {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
                <Spacer>
                <TouchableOpacity style={InitStyle.button} onPress={() => onSubmit({email,password})}>
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
    errorMessage: {
        fontSize: 14, 
        color: '#e61610',
        marginLeft: 10,
        marginRight: 10
    },
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