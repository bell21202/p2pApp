import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator, createMaterialTopTabNavigator} from 'react-navigation-tabs';

import SigninScreen from './src/screens/SigninScreen';
import SignupScreen from './src/screens/SignupScreen';
import ChatScreen from './src/screens/ChatScreen';
import ContactsScreen from './src/screens/ContactsScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import GroupScreen from './src/screens/GroupScreen';
import HomeScreen from './src/screens/HomeScreen';
import HubScreen from './src/screens/HubScreen';
import NotificationScreen from './src/screens/NotificationScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import CreateProfileScreen from './src/screens/CreateProfileScreen';
import PostDetailScreen from './src/screens/PostDetailScreen';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';

import {Provider as AuthProvider} from './src/context/AuthContext';

import {setNavigator} from './src/navigationRef';
import ResolveAuthScreen from './src/screens/ResolveAuthScreen';
import InitScreen from './src/screens/InitScreen';

// nav --
const profileFlow = createStackNavigator({
  Profile: ProfileScreen,
  EditProfile: EditProfileScreen,
  ChangePassword: ChangePasswordScreen,
});

const messageFlow = createMaterialTopTabNavigator({
  Convo: ChatScreen,
  Contacts: ContactsScreen
});

// can this go?
const authFlow = createStackNavigator({
  Signup: SignupScreen,
  Signin: SigninScreen,
});

const hubFlow = createStackNavigator({
  Home: HomeScreen,
  Hub: HubScreen,
  PostDetail: PostDetailScreen,
});

const notificationsFlow = createStackNavigator({
  Notifications: NotificationScreen,
  PostDetail: PostDetailScreen
});

const switchNavigator = createSwitchNavigator({
  //ResolveAuth: ResolveAuthScreen,

  /*
  initFlow: createStackNavigator({
    Init: InitScreen,
    Signup: SignupScreen,
    Signin: SigninScreen,
    CreateProfile: CreateProfileScreen
  }),*/
  mainFlow: createBottomTabNavigator({
      Home: hubFlow,
      Profile: profileFlow,
      Notifications: notificationsFlow,
      Chat: messageFlow
  }),
});

const App = createAppContainer(switchNavigator);

// make the navigator available to the rest of the app 
export default () => {
  return (
    <AuthProvider>
        <App ref={(navigator) => {setNavigator(navigator)}} />
    </AuthProvider>
  );
};