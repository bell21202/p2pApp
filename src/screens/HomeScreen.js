import React, {useContext, useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Spacer from '../components/Spacer';
import Category from '../components/Category';
import {Context as AuthContext} from '../context/AuthContext';
import {Icon} from 'react-native-elements';

const HomeSreen = ({navigation}) => {
    const {state} = useContext(AuthContext);
    const {firstname} = state;

    return (
            <View>
            <View style={styles.topView} />
                <View style={styles.sideView}>
                    <View style={styles.innerView}>
                        <View style={styles.headerView}>
                            <Spacer>
                                <Text style={{fontSize: 24, color: '#2c2423'}}> Hi {firstname}! </Text>
                                <Spacer />
                                <Text style={{fontSize: 24, color: '#2c2423'}}> Welcome to </Text>
                                <Text style={{fontSize: 24, color:'#2c2423', fontWeight: 'bold'}}> Prison-to-Professionals</Text>
                                <Text style={{fontSize: 14, marginLeft: 8, marginTop: 15, color: '#aaaaaa' }}>Welcome back if this isn't your first time, as I'm sure you already know the ropes :) If this is your initial login feel free to explore below.</Text>
                            </Spacer>
                        </View>
                        <Text style={{fontSize: 18, marginLeft: 35, marginTop: 25, marginBottom: 10, color: '#2196f3'}}> Select from your categories! </Text>
                        <Spacer> 
                            <View style={styles.categories}>
                                <Category routeName={'Scholars Hub'}>
                                    <Image style={[styles.icon, {width: 40}]} source={require('../img/scholar_icon.png')} />
                                    <Text style={styles.categoryText}> Scholar </Text>
                                </Category>
                                <Category routeName={'Profile'}>
                                    <Image style={styles.icon} source={require('../img/profile_icon.png')} />
                                    <Text style={styles.categoryText}> Profile </Text>
                                </Category>
                                <Category routeName={'Message'}>
                                    <Image style={styles.icon} source={require('../img/chat_bubble_icon.png')} />
                                    <Text style={styles.categoryText}> Chat </Text>
                                </Category>
                                <Category routeName={'Community Hub'}>
                                    <Image style={[styles.icon, {width: 45}]} source={require('../img/stm_icon.png')} />
                                    <Text style={styles.categoryText}> Community </Text>
                                </Category>
                                <Category routeName={'!!'}>
                                    <Image style={styles.icon} source={require('../img/settings_icon.png')} />
                                    <Text style={styles.categoryText}> Settings </Text>
                                </Category>
                                <Category routeName={'Notifications'}>
                                    <Image style={styles.icon} source={require('../img/notification_icon.png')} />
                                    <Text style={styles.categoryText}> Alerts </Text>
                                </Category>
                            </View>
                        </Spacer>
                    </View>
                </View>
            </View>
    );  
};

HomeSreen.navigationOptions = () => {
    return {
        header: () => false,
    };
};

const styles = StyleSheet.create({
    headerView: {
        marginTop: 20,
        marginRight: 20,
        marginLeft: 25
    },
    topView: {
        backgroundColor: '#2196f3',
        height: 100
    },
    sideView: {
        backgroundColor: '#2196f3',   
    },
    innerView: {
        borderTopLeftRadius: 75,
        backgroundColor: '#f7f6f6',
        height: '100%'
    },
    categories: {
        marginLeft: 30,
        marginRight: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    categoryText: {
        textAlign: 'center',
        marginTop:10,
        fontSize: 15,
        color: '#2c2423',
    },
    icon: {
        alignSelf: 'center',
        width:35,
        height:35
    }
});

export default HomeSreen;