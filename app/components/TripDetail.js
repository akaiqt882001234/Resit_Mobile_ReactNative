//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Alert } from 'react-native';
import { useHeaderHeight } from '@react-navigation/stack';
import colors from '../misc/colors';
import RoundIconBtn from './RoundIconBtn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTrips } from '../contexts/TripProvider';

// create a component
const TripDetail = props => {
    const { trip } = props.route.params;
    const { setTrips } = useTrips();

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

    }
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
                        onPress={() =>
                            console.log('edit trip')} />
                    <RoundIconBtn
                        antIconName='delete'
                        style={{ backgroundColor: colors.ERROR, marginTop: 15 }}
                        onPress={displayDeleteAlert} />

                </View>
            </View>
        </>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
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
