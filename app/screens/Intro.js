//import liraries
import React, { Component, useState } from 'react';
import { StatusBar } from 'react-native';
import { TextInput } from 'react-native';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import colors from '../misc/colors';
import RoundIconBtn from '../components/RoundIconBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
const Intro = () => {
    const [name, setName] = useState('');
    const handleOnChangeText = text => setName(text);
    const handleSubmit = async () => {
        const user = { name: name };
        await AsyncStorage.setItem('user', JSON.stringify(user));
    };

    return (
        <>
            <StatusBar hidden />
            <View style={styles.container}>
                <Text style={styles.inputTitle}>Enter your name to continues:</Text>
                <TextInput value={name} onChangeText={handleOnChangeText}
                    placeholder='Enter Name' style={styles.textInput} />
                {name.trim().length >= 3 ? (
                    <RoundIconBtn antIconName='arrowright' onPress={handleSubmit} />
                ) : null}
            </View>
        </>
    );
};

// define your styles
const width = Dimensions.get('window').width - 50;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    textInput: {
        borderWidth: 2,
        borderColor: colors.PRIMARY,
        color: colors.PRIMARY,
        width,
        height: 50,
        borderRadius: 10,
        paddingLeft: 15,
        fontSize: 20,
        marginBottom: 15,
    },
    inputTitle: {
        alignSelf: 'flex-start',
        paddingLeft: 25,
        marginBottom: 5,
        opacity: 0.5,
    }
});

//make this component available to the app
export default Intro;
