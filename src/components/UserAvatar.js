import React from 'react';
import {Avatar} from 'react-native-elements';

const UserAvatar = (props) => {
    var size = props.size ? props.size : 48
    var title = props.title ? props.title : "?";
    var color = props.color ? props.color : 'gray';
    var sourceimage = props.sourceimage ? props.sourceimage : null;
    
    return (
        <>
            {!sourceimage ?
            <Avatar
                rounded
                size= {size}
                title= {title}
                placeholderStyle={{ backgroundColor: 'transparent' }}
                overlayContainerStyle={{backgroundColor: color}}
            />
            :
            <Avatar
                rounded
                size= {size}
                title= {title}
                source={sourceimage}
                placeholderStyle={{ backgroundColor: 'transparent' }}
                overlayContainerStyle={{backgroundColor: color}}
            />
            }
        </>
    );
}

export default UserAvatar;