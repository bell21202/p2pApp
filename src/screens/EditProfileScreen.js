import React from 'react';
import {StyleSheet, View} from 'react-native';
import EditProfileForm from '../components/EditProfileForm';
import { CardStyleInterpolators } from 'react-navigation-stack';

const EditProfileScreen = ({navigation}) => {
    return (
    <View>
        <EditProfileForm nav={navigation} />
    </View>
    );
};

EditProfileScreen.navigationOptions = () => {
    title = "Edit Profile"
    return {
        title: title,
        headerTitleAlign: 'center',
        headerStyle: {
            backgroundColor: '#2196f3'
        },
        headerTintColor: 'white',

        // slide from right
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS

    }
}

const styles = StyleSheet.create({
    headerView: {
        alignItems: 'center',
        marginTop: '5%'
    }
});

export default EditProfileScreen;