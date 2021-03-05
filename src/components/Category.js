import React from 'react';
import {TouchableOpacity, Image, StyleSheet, Text} from 'react-native';
import {withNavigation} from 'react-navigation';

const Category = ({children, routeName, navigation }) => {
    var hubTitle = routeName;
    
    if (routeName != null && routeName.includes('Hub')) {
        // reset to real routename
        routeName = 'Hub';
    }
    return (
        <TouchableOpacity style={styles.container} onPress ={() => navigation.navigate(routeName, {hubTitle})}>
            {children}
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        borderBottomColor: '#606060',
        borderColor: '#ebebeb',
        borderWidth: .75,
        borderBottomWidth: .5,
        height: 95,
        width:95,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 10
    }
});

export default withNavigation(Category);