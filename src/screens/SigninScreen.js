import React, {useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import {Context} from '../context/AuthContext';
import {NavigationEvents, SafeAreaView} from 'react-navigation';
import Spacer from '../components/Spacer';
import InitStyle from '../stylecomponents/InitStyle';

const SigninScreen = () => {
    const {state, signin, clearErrorMessage} = useContext(Context);

    return (
        <SafeAreaView style={InitStyle.container} forceInset={{top: 'always'}}>
            <NavigationEvents onWillFocus={clearErrorMessage} />
            <AuthForm
                headerText="Sign in to your account"
                errorMessage={state.errorMessage}
                onSubmit={signin}
                submitButtonText="Sign In"
            />
            <View style={styles.viewStyle}> 
            <Spacer> 
                <Text>
                    Don't have an account?
                </Text>
            </Spacer>
            <NavLink
                text="Sign up instead"
                routeName="Signup" 
            />
            </View>   
        </SafeAreaView>
    );
};

SigninScreen.navigationOptions = () => {
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

export default SigninScreen;