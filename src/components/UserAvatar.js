import React from 'react';
import {Avatar} from 'react-native-elements';
import colorGen from '../helpers/colorGen';

const UserAvatar = (props) => {
    var size = props.size ? props.size : 48
    var title = props.title ? props.title : "?";
    var color = props.color ? props.color : 'white';
    var sourceimage = props.sourceimage ? props.sourceimage : null;
    var containerStyle = props.containerStyle ? props.containerStyle : null;
    var outlineColor =  colorGen(title);
    
    return (
        <>
            {!sourceimage ?
            <Avatar
                rounded
                size= {size}
                title= {title}
                placeholderStyle={{ backgroundColor: 'transparent' }}
                overlayContainerStyle={{backgroundColor: color, borderColor: outlineColor, borderWidth: 1}}
                titleStyle={{color: outlineColor}}
                containerStyle={containerStyle}
            />
            :
            <Avatar
                rounded
                size= {size}
                title= {title}
                source={sourceimage}
                placeholderStyle={{ backgroundColor: 'transparent' }}
                //overlayContainerStyle={{backgroundColor: color}}
                containerStyle={containerStyle}
            />
            }
        </>
    );
}

export default UserAvatar;