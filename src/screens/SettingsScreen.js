import React, {useState, useContext, useEffect} from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Platform, ToastAndroid, Alert} from 'react-native';
import {Switch} from 'react-native-paper';
import {Context as AuthContext} from '../context/AuthContext';
import registerForPushNotificationsAsync from '../helpers/registerForPushNotificationsAsync';

const SettingsScreen = (props) => {
    const {getUserSettings, saveUserSettings, savePushToken} = useContext(AuthContext);
    const [settings, setSettings] = useState(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            var settings = await getUserSettings();
            setSettings(loadSettings(settings[0]));
        } catch(err) {
            // todo_log add statement
        }
    }

    const loadSettings = (obj) => {
        if(obj){
            return obj.settings;
        }
        // this will be an undefined because they've disabled receiving notifications
        else{
            return {'mainNotify': false, 'scholarNotify': false, 'communityNotify': false, 'chatNotify': false};
        }
    }
    
    var mainSwitch;
    var scholarSwitch;
    var communitySwitch;
    var chatSwitch;

    if(settings == null || settings == undefined) {
        mainSwitch = false;
        scholarSwitch = false;
        communitySwitch = false;
        chatSwitch = false;
    }
    else{
        mainSwitch = settings.mainNotify;
        scholarSwitch = settings.scholarNotify;
        communitySwitch = settings.communityNotify;
        chatSwitch = settings.chatNotify;
    }

    const switchHandler = () => {
        var obj;
        if(!mainSwitch) {
            obj = {'mainNotify': mainSwitch, 'scholarNotify': false, 'communityNotify': false, 'chatNotify': false};
        }else{
            obj = {'mainNotify': mainSwitch, 'scholarNotify': scholarSwitch, 'communityNotify': communitySwitch, 'chatNotify': chatSwitch};
        }
        setSettings(obj);
    }

    const saveSettings = async () => {
        try{
            if(settings.mainNotify) {
                // generate a push token first and save it.
                const token = await registerForPushNotificationsAsync();     
                if(token) {
                    await savePushToken({token});
                }
            }
            await saveUserSettings({settings});
            // show save confirmation msg
            if(Platform.OS == 'android') {
                ToastAndroid.show('Saved', ToastAndroid.SHORT)
            } else{
                Alert.alert('Saved'); // todo_pp
            }
        }catch(err) {
            // todo_log statement
        }
    }

    const closeSettings = () => {
        if(props != null) {
            props.overlayFunction(false);
        }
    }

    return (
        <View>
            <View style={{backgroundColor:'#2196f3', height: 45, borderTopLeftRadius: 10, borderTopRightRadius: 10}}> 
                <Text style={{alignSelf:'center', marginTop: 10, fontSize: 18, color: 'white'}}> Settings </Text>
            </View>
            <View style={styles.switch}>
                <Text style={{color: 'gray'}}>Prison-to-Professional notifications</Text>
                <Switch color={'#2196f3'} value={mainSwitch} onValueChange={() => {mainSwitch = !mainSwitch; switchHandler()}} />
            </View>
            <View style={styles.switch}>
                <Text style={{color: 'gray'}}> Scholar post notifications </Text>
                <Switch color={'#2196f3'} value={scholarSwitch} onValueChange={() => {scholarSwitch = !scholarSwitch; switchHandler()}} />
            </View>
            <View style={styles.switch}>
                <Text style={{color: 'gray'}}> Commuity post notifications </Text>
                <Switch color={'#2196f3'} value={communitySwitch} onValueChange={() => {communitySwitch = !communitySwitch; switchHandler()}} />
            </View>
            <View style={styles.switch}>
                <Text style={{color: 'gray'}}> Chat message notifications </Text>
                <Switch color={'#2196f3'} value={chatSwitch} onValueChange={() => {chatSwitch = !chatSwitch; switchHandler()}} />
            </View>
            <View style={{marginTop: 10, justifyContent: 'space-around' , flexDirection: 'row'}}>
                <TouchableOpacity style={{paddingLeft: 5, paddingRight: 5, borderRadius: 5}} onPress={() => {saveSettings()}}>
                    <Text style={{color: 'darkgray', fontSize: 15}}> Save </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{paddingLeft: 5, paddingRight: 5, borderRadius: 5}} onPress={() => {closeSettings()}}>
                    <Text style={{color: 'darkgray', fontSize: 15}}> Close </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    switch: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10
    },
})

export default SettingsScreen;