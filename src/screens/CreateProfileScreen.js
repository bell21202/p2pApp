import React from 'react';
import {StyleSheet, View} from 'react-native';
import EditProfileForm from '../components/EditProfileForm';

const CreateProfileScreen = ({navigation}) => {
    return (
    <View>
        <EditProfileForm nav={navigation} />
    </View>
    );
};

CreateProfileScreen.navigationOptions = () => {
    title = "Create Profile"
    return {
        title: title,
        headerTitleAlign: 'center',
        headerStyle: {
            backgroundColor: '#2196f3'
        },
        headerTintColor: 'white'
    }
}

const styles = StyleSheet.create({
    headerView: {
        alignItems: 'center',
        marginTop: '5%'
    }
});

export default CreateProfileScreen;