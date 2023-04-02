//import liraries
import React, { Component, createContext, useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// create a component
const TripContext = createContext()

const TripProvider = ({ children }) => {
    const [trips, setTrips] = useState([]);

    const findTrips = async () => {
        const result = await AsyncStorage.getItem('trips');
        if (result !== null) setTrips(JSON.parse(result));
    };

    useEffect(() => {
        findTrips();
    }, []);

    return (
        <TripContext.Provider value={{ trips, setTrips, findTrips }} >
            {children}
        </TripContext.Provider>
    );
};

// define your styles

//make this component available to the app
export const useTrips = () => useContext(TripContext);
export default TripProvider;
