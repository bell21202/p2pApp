import React from 'react';
import {Avatar} from 'react-native-elements';

const UserAvatar = (props) => {
    var size = props.size ? props.size : 48
    var title = props.title ? props.title : "?";
    var color = props.color ? props.color : 'gray'; // todo: put random color picker here
    var sourceimage = props.sourceimage ? props.sourceimage : null;
    var containerStyle = props.containerStyle ? props.containerStyle : null;
    
    return (
        <>
            {!sourceimage ?
            <Avatar
                rounded
                size= {size}
                title= {title}
                placeholderStyle={{ backgroundColor: 'transparent' }}
                overlayContainerStyle={{backgroundColor: color}}
                containerStyle={containerStyle}
            />
            :
            <Avatar
                rounded
                size= {size}
                title= {title}
                source={sourceimage}
                placeholderStyle={{ backgroundColor: 'transparent' }}
                overlayContainerStyle={{backgroundColor: color}}
                containerStyle={containerStyle}
            />
            }
        </>
    );
}

export default UserAvatar;