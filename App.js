import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Icon} from 'react-native-elements';

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
import MessageScreen from './src/screens/MessageScreen';
import ContactDetailScreen from './src/screens/ContactDetailScreen';
import ChatDetailScreen from './src/screens/ChatDetailScreen';

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

const messageFlow = createStackNavigator({
  Message: MessageScreen,
  ChatDetail: ChatDetailScreen,
  ContactDetail: ContactDetailScreen,
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
      Home: {
        screen: hubFlow,
        navigationOptions: {
          tabBarIcon:({focused}) => (
            <Icon name="home" type='material' color={focused ? '#2196f3' : '#c0c0c0'} size={25} />
          ),
      }},
      Profile: {
        screen: profileFlow,
        navigationOptions: {
          tabBarIcon:({focused}) => (
            <Icon name="person-add" type='material' color={focused ? '#2196f3' : '#c0c0c0'} size={28} />
          ),
      }},
      Notifications: {
        screen: notificationsFlow,
        navigationOptions: {
          tabBarIcon: ({focused}) => (
            <Icon name="notifications-active" type='material' color={focused ? '#2196f3' : '#c0c0c0'} size={25} />
          ),
      }},
      Chat: {
        screen: messageFlow,
        navigationOptions: {
          tabBarIcon: ({focused}) => (
            <Icon name="message" type="entypo"  color={focused ? '#2196f3' : '#c0c0c0'} size={25} />
          ),
      }},
      },{
    tabBarOptions: {
      style: {
        paddingBottom: 2
      },
      activeTintColor: '#2196f3',
      inactiveTintColor: '#c0c0c0'
    },

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