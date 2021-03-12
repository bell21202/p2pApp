import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 100,
    },
    textView: {
        marginLeft: 20,
        marginRight: 20,
    },
    buttonView: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 20,
    },
    headerText: {
        fontSize: 30,
        textAlign: 'center',
        color: '#2c2423'
    },
    subText: {
        fontSize: 16,
        color: '#606060',
        textAlign: 'center'
    },
    button: {
        borderColor: '#2196f3', //#2196f3
        borderWidth: 1,
        alignItems: 'center',
        borderRadius: 5,
        padding: 3,
        backgroundColor: '#2196f3'
    },
    buttonWhiteFill: {
        borderColor: '#2196f3',
        borderWidth: 1,
        alignItems: 'center',
        borderRadius: 5,
        padding: 3,
        backgroundColor: 'white'
    },
    buttonText: {
        fontSize: 18,
        color: 'white'
    },
    buttonTextWhiteFill: {
        fontSize: 18,
        color: '#2196f3'
    },

    // todo: rename entire file to global style or something
    errorMessage: {
        fontSize: 14,
        color:'#e16122',
    },
});