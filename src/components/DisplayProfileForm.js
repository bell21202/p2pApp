import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Spacer from '../components/Spacer';
import {Icon} from 'react-native-elements';

const DisplayProfileForm = (props) => {
    return (
        <View>
            <Spacer />
            <View style={styles.displayView}>
                <Icon name="user-circle" type='font-awesome-5' color={'#2196f3'} size={25} containerStyle={styles.iconStyle} />
                <Text style={{marginLeft: 10, fontSize: 16, color: '#606060'}}>
                    {props.firstname + ' ' + props.lastname}
                </Text>
            </View>
            <View style={styles.displayView}>
                <Icon name="mail-outline" type='material' color={'#2196f3'} size={25} containerStyle={styles.iconStyle} />
                <Text style={{marginLeft: 10, fontSize: 16, color: '#606060'}}>
                    {props.email}
                </Text>
            </View>
            <View style={styles.displayView}>
                <Icon name="idcard" type='antdesign' color={'#2196f3'} size={25} containerStyle={styles.iconStyle} />
                <Text style={{marginLeft: 10, fontSize: 16, color: '#606060'}}>
                    {props.membertype}
                </Text>
            </View>
            {props.gradyear ?
            <View style={styles.displayView}>
                <Icon name="graduation" type='simple-line-icon' color={'#2196f3'} size={25} containerStyle={styles.iconStyle} />
                    <Text style={{marginLeft: 10, fontSize: 16, color: '#606060'}}>
                        {props.gradyear}
                    </Text>
            </View> :  null
            }
        </View>
    );
}

const styles = StyleSheet.create({
    displayText: {
        marginTop: 1,
        fontSize: 16
    },
    iconStyle: {
        alignSelf: 'flex-start',
    },
    displayView: {
        borderBottomColor: 'lightgray',
        borderBottomWidth: .5,
        paddingTop: 10,
        paddingBottom: 10,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
    }
});

export default DisplayProfileForm;