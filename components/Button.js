import React from 'react';
import { StyleSheet, TouchableHighlight, Text, Dimensions } from 'react-native';

const style = StyleSheet.create({
    button: {
        fontSize: 30,
        height: Dimensions.get('window').width / 4,
        width: Dimensions.get('window').width / 4,
        padding: 20,
        textAlign: 'center',
        backgroundColor: '#f0f0f0',
        borderWidth: 1,
        borderColor: '#222',
    },
    buttonOperation:{
        backgroundColor: '#f2f' 
    },
    buttonEqual:{
        width: (Dimensions.get('window').width / 4) * 3
    },
    buttonClear: {
        width: (Dimensions.get('window').width / 4) * 2
    }
});

export default props => {
    const allStyle = [style.button];
    if (props.buttonOperation) allStyle.push(style.buttonOperation);
    if (props.buttonEqual) allStyle.push(style.buttonEqual);
    if (props.buttonClear) allStyle.push(style.buttonClear);
    return (
        <TouchableHighlight onPress={props.onPress}> 
            <Text style={allStyle}>{props.label}</Text>
        </TouchableHighlight>
    )
}