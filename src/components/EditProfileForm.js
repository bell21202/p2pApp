import React, {useContext, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';
import {NavigationEvents, SafeAreaView} from 'react-navigation';
import CustomInput from '../components/CustomInput';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import memTypeConverter from '../helpers/memTypeConverter';
import { Checkbox } from 'react-native-paper';
import InitStyle from '../stylecomponents/InitStyle';


const EditProfileForm = (newUser) => {
    const {state, accountSave, clearErrorMessage} = useContext(AuthContext);
    const {email, firstname, lastname, memberType, cohortDate, errorMessage} = state;

    // use the defaults we have
    const [emailIn, setEmail] = useState(email);
    const [firstnameIn, setFirstName] = useState(firstname);
    const [lastnameIn, setLastName] = useState(lastname);
    const [memberTypeIn, setMemType] = useState(memberType);
    const [cohortDateIn, setCohortDate] = useState(cohortDate);
    const [visible, setVisible] = useState(false);

    // event handler from date picker
    const datePicked = (event, selectedDate) => {
        if(selectedDate)
        {
            setVisible(!visible);
            setCohortDate(selectedDate);
        } else {
            setVisible(!visible);
        }
    };

    // event handler from check boxes
    const checkboxHandler = () => {
        var val = memTypeConverter({t : type.tutor, m : type.mentor, s: type.scholar});
        // update state
       setMemType(val);
    }
    var type = memTypeConverter(memberTypeIn);

    return (
    <View>
        <NavigationEvents onWillFocus={clearErrorMessage} />
        <View style={InitStyle.textView}>
        <Spacer>
            <CustomInput
                mode={'outlined'}
                label={'First name'}
                value={firstnameIn}
                onChangeText={setFirstName}
                style={styles.inputStyle}
                theme={{ colors: { text: 'black', primary: '#2196f3' }}}
            />
        </Spacer>
        <Spacer>
            <CustomInput
                mode={'outlined'}
                label={'Last name'}
                value={lastnameIn}
                onChangeText={setLastName}
                style={styles.inputStyle}
                theme={{ colors: { text: 'black', primary: '#2196f3' }}}
            />
        </Spacer>
        <Spacer>
            <CustomInput
                mode = {'outlined'}
                label={"Email"}
                value={emailIn}
                keyboardType={'email-address'}
                onChangeText={setEmail}
                style={styles.inputStyle}
                theme={{ colors: { text: 'black', primary: '#2196f3' }}}
            />
         </Spacer>
         <Spacer>
            <TouchableOpacity style={styles.passwordButton}> 
                <Text style={{fontSize: 14, color: '#2196f3', fontWeight: 'bold'}}> Change password </Text>
            </TouchableOpacity>
        </Spacer>
            <Spacer>
                <Text style={{marginLeft: 5 , fontSize: 16, color: '#606060'}}> Member Type </Text>
            </Spacer>
            <Spacer>  
                <View style={styles.checkboxContainer}>           
                    <Checkbox color={'#2196f3'} status={type.tutor ? 'checked' : 'unchecked'} onPress={() => {type.tutor = !type.tutor; checkboxHandler()}} />    
                    <Text style={styles.checkboxLabel}> Tutor </Text>
                    <Checkbox color={'#2196f3'} status={type.mentor ? 'checked' : 'unchecked' } onPress={() => {type.mentor = !type.mentor; checkboxHandler()}} />
                    <Text style={styles.checkboxLabel}> Mentor </Text>
                    <Checkbox color={'#2196f3'} status={type.scholar ? 'checked' : 'unchecked'} onPress={() => {type.scholar = !type.scholar; setCohortDate(null); checkboxHandler()}} />
                    <Text style={styles.checkboxLabel}> Scholar </Text>
                </View>
            </Spacer>
            <Spacer>
                <CustomInput
                    mode={'outlined'}
                    label={"Graduation Year"}
                    value={cohortDateIn ? moment(cohortDateIn).calendar() : 'mm/dd/yyyy'}
                    style={{height: 35, width: 175}} // todo: is this a problem??
                    theme={{ colors: { text: 'black', primary: '#2196f3' }}}
                    // set editable based on if they are a scholar
                    editable={type.scholar}
                    onKeyPress={() => {setVisible(!visible)}}
                />
            </Spacer>
            
            {visible ? <DateTimePicker
                testID="dateTimePicker"
                value={!cohortDateIn ? Date.now() : cohortDateIn}
                mode='date'
                onChange={datePicked}
                display='spinner'/> : null
            }
            </View>
            <View style={InitStyle.buttonView}>
                <Spacer>
                    <TouchableOpacity style={{alignItems: 'center'}}>
                        <Text style={{color: '#606060', fontSize: 18}}> Change photo </Text>
                    </TouchableOpacity>
                </Spacer>
                <Spacer />
                <Spacer>
                    <TouchableOpacity style={InitStyle.button} onPress={() => accountSave({emailIn, firstnameIn, lastnameIn, memberTypeIn, cohortDateIn})}> 
                    <Text style={InitStyle.buttonText}> Save </Text>
                    </TouchableOpacity>
                </Spacer>
                {errorMessage ? <Text style={styles.errorMessage}> {errorMessage} </Text> : null}
            </View>
    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 50,
    },
    errorMessage: {
        fontSize: 16, 
        color: 'red',
        marginLeft: 15,
        marginTop: 15
    },
    inputStyle: {
        height: 35
    },
    checkboxContainer: {
        flexDirection: 'row',
        marginTop: -10
    },
    checkboxLabel: {
       marginTop: 10,
       color: '#606060'
    },
    image: {
        width: 110,
        height: 60,
        alignSelf: 'center',
        marginBottom: 20
    },
    passwordButton: {
        alignItems: 'center',
        borderRadius: 5,
        padding: 5,
        borderColor: '#2196f3',
        borderWidth: 1,
        width: '50%'
    }
});

export default EditProfileForm;