import React from 'react';
import {Text, StyleSheet, Image, View} from 'react-native';


const DisplayInput = (props) => {
    return (
        <View style={styles.container}>
            <Image style={props.iconStyle} source={props.icon}/>
            <Text style={props.valueStyle}>
                {props.value}
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#cccccc',
        borderBottomWidth: 1,
        borderStyle: 'dotted',
        paddingBottom: 2,
        marginBottom: 10
    },
});

export default DisplayInput;