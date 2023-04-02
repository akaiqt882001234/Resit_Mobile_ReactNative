//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Alert } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTrips } from '../contexts/TripProvider';
import TripInputModal from '../components/TripInputModal';

// create a component
const TripDetail = props => {
    const [trip, setTrip] = useState(props.route.params.trip);
    const { setTrips } = useTrips();
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    //filter ID and Delete Trip
    const deleteTrip = async () => {
        const result = await AsyncStorage.getItem('trips');
        let trips = [];
        if (result !== null) trips = JSON.parse(result);
        const newTrips = trips.filter(n => n.id !== trip.id);
        setTrips(newTrips);
        await AsyncStorage.setItem('trips', JSON.stringify(newTrips));
        props.navigation.goBack();
        console.log('delete already')
    };
    // Delete Alert Dialog
    const displayDeleteAlert = () => {
        Alert.alert(
            'Delete this Trip?',
            'This Action will be delete your trip!',
            [
                {
                    text: 'Delete',
                    onPress: deleteTrip
                },
                {
                    text: 'Cancel',
                    onPress: () => console.log('cancel')
                },
            ],
            {
                cancelable: true,
            }
        );
    };

    // Handle/Pressing Update Button
    const handleUpdate = async (title, dest, date, risk, desc) => {
        const result = await AsyncStorage.getItem('trips')
        let trips = [];
        if (result !== null) trips = JSON.parse(result)

        const newTrips = trips.filter(n => {
            if (n.id === trip.id) {
                n.title = title
                n.dest = dest
                n.date = date
                n.risk = risk
                n.desc = desc
                n.isUpdated = true

                setTrip(n);
            }
            return n;
        })
        setTrips(newTrips);
        await AsyncStorage.setItem('trips', JSON.stringify(newTrips))
    };
    // Pressing for close alert and back to view
    const handleOnClose = () => setShowModal(false)
    // Open Edit Mode
    const openEditModal = () => {
        setIsEdit(true);
        setShowModal(true);
    };
    // View
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.title}>{trip.title}</Text>
                <Text style={styles.text}>Destination: {trip.dest}</Text>
                <Text style={styles.text}>Date of Trip: {trip.date}</Text>
                <Text style={styles.text}>Require Risk: {trip.risk}</Text>
                <Text style={styles.text}>Description: {trip.desc}</Text>
                <View style={styles.buttonContainer}>
                    <RoundIconBtn
                        antIconName='edit'
                        onPress={openEditModal} />
                    <RoundIconBtn
                        antIconName='delete'
                        style={{ backgroundColor: colors.ERROR, marginTop: 15 }}
                        onPress={displayDeleteAlert} />
                </View>
                <TripInputModal isEdit={isEdit} trip={trip} onClose={handleOnClose} onSubmit={handleUpdate} visible={showModal} />
            </View>
        </>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F5EB',
        paddingHorizontal: 20,
        paddingVertical: 50,
    },
    title: {
        fontSize: 30,
        color: colors.PRIMARY,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 20,
        opacity: 0.5,
    },
    buttonContainer: {
        position: 'absolute',
        right: 15,
        bottom: 50,
    },

});

//make this component available to the app
export default TripDetail;
