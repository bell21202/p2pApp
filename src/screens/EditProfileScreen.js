import React from 'react';
import {StyleSheet, View} from 'react-native';
import EditProfileForm from '../components/EditProfileForm';
import {Avatar} from 'react-native-elements';
import Spacer from '../components/Spacer';

const EditProfileScreen = ({navigation}) => {
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
        {/*<Image style={styles.image} source={require('../img/unnamed.png')} />
        <Text style={styles.headerText}> Edit Profile  </Text>*/}
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
        marginLeft: 10,
        marginRight: 10
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

export default EditProfileScreen;