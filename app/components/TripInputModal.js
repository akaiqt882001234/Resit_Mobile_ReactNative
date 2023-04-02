//import liraries

import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, Modal, StatusBar, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';


// create a component
const TripInputModal = ({ visible, onClose, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [dest, setDest] = useState('');
    const [date, setDate] = useState('');
    const [risk, setRisk] = useState('');
    const [desc, setDesc] = useState('');


    const handleModalClose = () => {
        Keyboard.dismiss;
    };

    const handleOnChangeText = (text, valueFor) => {
        if (valueFor === 'title') setTitle(text);
        if (valueFor === 'dest') setDest(text);
        if (valueFor === 'date') setDate(text);
        if (valueFor === 'risk') setRisk(text);
        if (valueFor === 'desc') setDesc(text);
    };

    // console.log(title, dest, date, risk, desc);

    const handleSubmit = () => {
        if (!title.trim() &&
            !dest.trim() &&
            !date.trim() &&
            !risk.trim() &&
            !desc.trim())
            return onClose();
        onSubmit(title, dest, date, risk, desc);
        setTitle('');
        setDest('');
        setDate('');
        setRisk('');
        setDesc('');
        onClose();
    }

    const closeModal = () => {
        setTitle('');
        setDest('');
        setDate('');
        setRisk('');
        setDesc('');
        onClose();

    }

    return (
        <>
            <StatusBar hidden />
            <Modal visible={visible} animationType='fade'>
                <View style={styles.container}>
                    <TextInput value={title} onChangeText={(text) => handleOnChangeText(text, 'title')}
                        placeholder='Title'
                        style={[styles.input, styles.title]} />
                    <TextInput value={dest} onChangeText={(text) => handleOnChangeText(text, 'dest')}
                        placeholder='Destination'
                        style={[styles.input, styles.dest]} />
                    <TextInput value={date} onChangeText={(text) => handleOnChangeText(text, 'date')}
                        placeholder='Date'
                        style={[styles.input, styles.date]} />
                    <TextInput value={risk} onChangeText={(text) => handleOnChangeText(text, 'risk')}
                        placeholder='Risk'
                        style={[styles.input, styles.risk]} />
                    <TextInput value={desc} onChangeText={(text) => handleOnChangeText(text, 'desc')}
                        placeholder='Description'
                        style={[styles.input, styles.desc]} />
                    <View style={styles.buttonContainer}>
                        <RoundIconBtn size={30} antIconName='check' onPress={handleSubmit} />
                        {title.trim() || dest.trim() || date.trim() || risk.trim() || desc.trim() ? (
                            <RoundIconBtn
                                size={30}
                                style={{ marginLeft: 25 }}
                                antIconName='close'
                                onPress={closeModal}
                            />
                        ) : null}
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={handleModalClose}>
                    <View style={[styles.modalBG, StyleSheet.absoluteFillObject]}></View>
                </TouchableWithoutFeedback>
            </Modal>
        </>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        paddingTop: 50,
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: colors.PRIMARY,
        fontSize: 18,
        color: colors.DARK,
    },
    title: {
        height: 40,
        marginBottom: 15,
        fontWeight: 'bold',
    },
    date: {
        height: 40,
    },
    risk: {
        height: 40,
    },

    dest: {
        height: 100,
    },
    desc: {
        height: 50,
    },
    modalBG: {
        flex: 1,
        zIndex: -1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 15,
    }
});

//make this component available to the app
export default TripInputModal;
