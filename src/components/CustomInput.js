import React from 'react';
import {TextInput} from 'react-native-paper';

const CustomInput = (props) => {
    return (
        <TextInput
            mode={props.mode}
            label={props.label}
            placeholder={props.placeholder}
            placeholderTextColor={props.textColor}
            secureTextEntry={props.secureTextEntry}
            multiline={props.multiline}
            keyboardType={props.keyboardType}
            style={props.style}
            theme={props.theme}
            editable={props.editable}
            onFocus={props.onKeyPress}
            value={props.value}
            onChangeText={props.onChangeText}        />
    )
};

export default CustomInput;