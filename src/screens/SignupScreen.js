import React, {useContext, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Context as AuthContext} from '../context/AuthContext';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import {NavigationEvents, SafeAreaView} from 'react-navigation';
import Spacer from '../components/Spacer';
import InitStyle from '../stylecomponents/InitStyle';


const SignupScreen = () => {
    const {state, signup, clearErrorMessage} = useContext(AuthContext);
    
    return (
        <SafeAreaView style={InitStyle.container} forceInset={{top: 'always'}}>
            <NavigationEvents onWillFocus={clearErrorMessage} />
            <AuthForm 
                headerText="Sign up"
                errorMessage={state.errorMessage}
                submitButtonText="Continue"
                onSubmit={signup} 
            />
            <View style={styles.viewStyle}> 
                <Spacer> 
                    <Text>
                        Have an account?
                    </Text>
                </Spacer>
                <NavLink
                    routeName="Signin" 
                    text="Sign in instead!" 
                />
            </View>
        </SafeAreaView>
    );
};

SignupScreen.navigationOptions = () => {
    return {
        header: () => false,
    };
};

const styles = StyleSheet.create({
    viewStyle: {
        flexDirection: 'row',
        alignSelf: 'center'
    }
});

export default SignupScreen;