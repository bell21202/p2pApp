import React, {useState} from 'react';
import {Avatar} from 'react-native-elements';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';

const PostInput = React.forwardRef((props,ref) => {
    const [text, setText] = useState('');

    return (
    <View style={styles.container}>
        <Avatar
            rounded
            size={40}
            title={props.title}
            overlayContainerStyle={{backgroundColor: 'gray' }}
            containerStyle={{marginLeft: '5%', marginRight: '3%', marginTop: '3%', marginBottom: '3%'}}
        />    
        <TextInput
            style={styles.inputStyle}
            ref={ref}
            mode={'flat'}
            multiline={true}
            dense={true}
            theme={{ colors: { text: 'black', primary: '#2196f3' }}}
            placeholder={props.placeholder}
            onChangeText={(text) => setText(text)}
            value={text}
        />
        {props.showSend ?
            <TouchableOpacity>
                <Image style={styles.iconStyle} source={require('../img/planeFill_icon.png')} />
            </TouchableOpacity> : null
        }
    </View>
    );
});

const styles = StyleSheet.create({
    container: {
        //backgroundColor: 'blue',
        flexDirection: 'row',
        maxHeight: 125,

    },
    inputStyle: {
        marginTop: '3%',
        marginBottom: '3%',
        width: '75%',
        //backgroundColor: ''
    },
    iconStyle: {
        marginTop: 20,
        marginLeft: 5
    }
});

export default PostInput;