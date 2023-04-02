//import liraries

import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Modal, StatusBar, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';


// create a component
const TripInputModal = ({ visible, onClose, onSubmit, trip, isEdit }) => {
    const [title, setTitle] = useState('');
    const [dest, setDest] = useState('');
    const [date, setDate] = useState('');
    const [risk, setRisk] = useState('');
    const [desc, setDesc] = useState('');


    const handleModalClose = () => {
        Keyboard.dismiss;
    };

    useEffect(() => {
        if (isEdit) {
            setTitle(trip.title)
            setDest(trip.dest)
            setDate(trip.date)
            setRisk(trip.risk)
            setDesc(trip.desc)

        }
    }, [isEdit]);

    const handleOnChangeText = (text, valueFor) => {
        if (valueFor === 'title') setTitle(text);
        if (valueFor === 'dest') setDest(text);
        if (valueFor === 'date') setDate(text);
        if (valueFor === 'risk') setRisk(text);
        if (valueFor === 'desc') setDesc(text);
    };

    // console.log(title, dest, date, risk, desc);

    const handleSubmit = () => {
        if (!title.trim() && !dest.trim() && !date.trim() && !risk.trim() && !desc.trim())
            return onClose();
        if (isEdit) {
            onSubmit(title, dest, date, risk, desc)
        } else {
            onSubmit(title, dest, date, risk, desc);
            setTitle('');
            setDest('');
            setDate('');
            setRisk('');
            setDesc('');
        }
        onClose();
    };

    const closeModal = () => {
        if (!isEdit) {
            setTitle('');
            setDest('');
            setDate('');
            setRisk('');
            setDesc('');
        }
        onClose();

    };;

    return (
        <>
            <StatusBar hidden />
            <Modal visible={visible} animationType='fade'>
                <View style={styles.container}>
                    <Text style={styles.text}>Title:</Text>
                    <TextInput value={title} onChangeText={(text) => handleOnChangeText(text, 'title')}
                        placeholder='Title'
                        style={[styles.input, styles.title]} />
                    <Text style={styles.text}>Destination:</Text>
                    <TextInput value={dest} onChangeText={(text) => handleOnChangeText(text, 'dest')}
                        placeholder='Destination'
                        style={[styles.input, styles.dest]} />
                    <Text style={styles.text}>Date of Trip:</Text>
                    <TextInput value={date} onChangeText={(text) => handleOnChangeText(text, 'date')}
                        placeholder='Date'
                        style={[styles.input, styles.date]} />
                    <Text style={styles.text}>Require Risk:</Text>
                    <TextInput value={risk} onChangeText={(text) => handleOnChangeText(text, 'risk')}
                        placeholder='Risk'
                        style={[styles.input, styles.risk]} />
                    <Text style={styles.text}>Description:</Text>
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
        backgroundColor: '#E4DCCF'
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

    },
    date: {
        height: 40,
    },
    risk: {
        height: 40,
    },

    dest: {
        height: 50,
    },
    desc: {
        height: 100,
    },
    text: {
        fontSize: 18,
        paddingBottom: 10,
        fontWeight: 'bold',

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
