import React from 'react';
import {StyleSheet, View} from 'react-native';
import EditProfileForm from '../components/EditProfileForm';
import Spacer from '../components/Spacer';
import {Avatar} from 'react-native-elements';

const CreateProfileScreen = () => {
    return (
    <View>
        <View style={styles.headerView}>
            <Spacer> 
            <Avatar
                rounded
                icon={{name: 'camera', type: 'font-awesome'}}
                overlayContainerStyle={{backgroundColor: 'lightgray'}}
                size={'large'}
            />
            </Spacer>
        </View>
        <EditProfileForm />
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
    },
    /*
     container: {
        marginLeft: 20,
        marginRight: 20,
        marginTop: 50,
    },
    headerText: {
        fontSize: 24,
        textAlign: 'center',
        color: '#606060',
    },
    image: {
        width: 110,
        height: 60,
        alignSelf: 'center',
        marginBottom: 20
    }*/
});

export default CreateProfileScreen;