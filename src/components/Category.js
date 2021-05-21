import React, {useState} from 'react';
import {TouchableOpacity, Image, StyleSheet, Text, View} from 'react-native';
import {withNavigation} from 'react-navigation';
import {Overlay} from 'react-native-elements';
import SettingsScreen from '../screens/SettingsScreen';

const Category = ({children, routeName, navigation }) => {
    const [showOverlay, setShowOverlay] = useState(false);

    if(routeName == 'Scholars Hub') {
        routeName = 'ScholarHub';
    } else if(routeName == 'Community Hub') {
        routeName = 'CommHub';
    }
    return (
        <>
            <TouchableOpacity style={styles.container} onPress ={() => {routeName == 'Settings' ? setShowOverlay(!showOverlay) : navigation.navigate(routeName)}}>
                {children}
            </TouchableOpacity>

            {showOverlay ?
                <Overlay overlayStyle={styles.overlay} isVisible={showOverlay} onBackdropPress={() => setShowOverlay(!showOverlay)}>
                    <SettingsScreen overlayFunction={setShowOverlay}/>
                </Overlay> : null
            }
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        borderBottomColor: '#606060',
        borderColor: '#ebebeb',
        borderWidth: .75,
        borderBottomWidth: .5,
        height: 95,
        width:95,
        backgroundColor: 'white',
        borderRadius: 10,
        marginBottom: 10
    },
    overlay: {
        borderRadius: 5,
        padding: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingBottom: 10
    }
});

export default withNavigation(Category);