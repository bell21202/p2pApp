import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import { SafeAreaView } from 'react-navigation';


const ChatScreen = () => {
    return (
        <SafeAreaView style={styles.container} forceInset={{top: 'always'}}>
            <Text>
                Chat Screen
            </Text>
        </SafeAreaView>
        );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // fill as much vertical space as possible
        justifyContent: 'center',
        marginBottom: 150
    }
});

export default ChatScreen;