import React from 'react';
import {View, StyleSheet} from 'react-native';

const HRule = () => {
    return(
        <View style={styles.horizontalRule}>
        </View>
    )
};

const styles = StyleSheet.create({
    horizontalRule: {
        borderBottomColor: '#cccccc',
        borderBottomWidth: 1
    }
});

export default HRule;