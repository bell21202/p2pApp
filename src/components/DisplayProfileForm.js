import React from 'react';
import {View, StyleSheet} from 'react-native';
import Spacer from '../components/Spacer';
import DisplayInput from '../components/DisplayInput';


const DisplayProfileForm = (props) => {
    return (
        <View>
            <DisplayInput 
                value={props.firstname + ' ' + props.lastname}
                valueStyle={styles.displayText}
                icon={require('../img/person_icon.png')}
                iconStyle={{marginRight: 15}}
            />
            <Spacer />
            <DisplayInput
                value={props.email}
                valueStyle={styles.displayText}
                icon={require('../img/envelope_icon.png')}
                iconStyle={{marginRight: 15}}
            />
            <Spacer />
            <DisplayInput
                value={props.membertype}
                valueStyle={styles.displayText}
                icon={require('../img/member_icon.png')}
                iconStyle={{marginRight: 15}}
            />
            <Spacer />
            {props.gradyear ? <DisplayInput
                value={props.gradyear}
                valueStyle={styles.displayText}
                icon={require('../img/grad_icon.png')}
                iconStyle={{marginRight: 13}} /> : null      
            }
        </View>
    );
}

const styles = StyleSheet.create({
    displayText: {
        marginTop: 1,
        fontSize: 16
    }
});

export default DisplayProfileForm;