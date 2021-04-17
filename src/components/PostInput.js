import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';

const PostInput = React.forwardRef((props,ref) => {
    const [text, setText] = useState('');

    return (
    <View style={styles.container}>
        <TextInput
            style={styles.inputStyle}
            ref={ref}
            mode={'flat'}
            multiline={true}
            dense={true}
            theme={{ colors: { text: 'black', primary: 'transparent' }}}
            placeholder={props.placeholder}
            onChangeText={(text) => setText(text)}
            value={text}
            underlineColor={'transparent'}
        />
    </View>
    );
});

const styles = StyleSheet.create({
    container: {
        maxHeight: 125,
        width: '85%',
        margin: 5,

    },
    inputStyle: {
        backgroundColor: 'white',
        borderRadius: 5,
        marginLeft: 5
    },
});

export default PostInput;