import React, {useContext} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import Spacer from '../components/Spacer';
import {Context as AuthContext} from '../context/AuthContext';
import {SafeAreaView} from 'react-navigation';
import { Button } from 'react-native';
import InitStyle from '../stylecomponents/InitStyle';

const InitScreen = ({navigation}) => {
    const {signout} = useContext(AuthContext);
 
    return (
        <SafeAreaView style={InitStyle.container} forceInset={{top: 'always'}}>
            <Image style={styles.image} source={require('../img/unnamed.png')} />
            
            <View style={InitStyle.textView}>
                <Spacer> 
                    <Text style={InitStyle.headerText}> Welcome to P2P </Text>
                </Spacer>
                <Text style={InitStyle.subText}> Where we invest in potential prison to professionals </Text>
            </View>
            <View style={InitStyle.buttonView}>
                <Spacer> 
                    <TouchableOpacity style={InitStyle.button} onPress={() => {navigation.navigate('Signup')}}>
                        <Text style={InitStyle.buttonText}> Create new account </Text>
                    </TouchableOpacity>
                </Spacer>
                <Spacer>         
                    <TouchableOpacity style={InitStyle.button} onPress={() => {navigation.navigate('Signin')}}>
                        <Text style={InitStyle.buttonText}> Login </Text>
                    </TouchableOpacity>
                </Spacer>
            </View>
        </SafeAreaView>
    );
};

InitScreen.navigationOptions = () => {
    return {
        header: () => false,
    };
}

const styles = StyleSheet.create({
    image: {
        width: 200,
        height: 150,
        alignSelf: 'center'
    }

});

export default InitScreen;