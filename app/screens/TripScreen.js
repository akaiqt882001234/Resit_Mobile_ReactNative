//import liraries
import React, { Component, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../misc/colors';
import SearchBar from '../components/SearchBar';
import RoundIconBtn from '../components/RoundIconBtn';

// create a component
const TripScreen = ({ user }) => {
    const [greet, setGreet] = useState('');

    const findGreet = () => {
        const hrs = new Date().getHours();
        if (hrs === 0 || hrs < 12) return setGreet('Morning');
        if (hrs === 1 || hrs < 17) return setGreet('Afternoon');
        setGreet('Evening');
    }

    useEffect(() => {
        findGreet();
    }, [])

    return (
        <>
            <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT} />
            <View style={styles.container}>
                <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>
                <SearchBar containerStyle={{ marginVertical: 15 }} />
                <View style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}>
                    <Text style={styles.emptyHeader}>Add Trips</Text>
                    <RoundIconBtn onPress={() => console.log('openmodal')} antIconName='plus' style={styles.addButton} />
                </View>
            </View>
        </>
    );
};

// define your styles
const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 50,
    },
    container: {
        paddingHorizontal: 20,
        paddingTop: 15,
        flex: 1,

    },
    emptyHeader: {
        fontSize: 20,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        opacity: 0.2,
    },
    emptyHeaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -1,

    },
    addButton: {
        position: 'absolute',
        right: 30,
        bottom: 80,
    },
});

//make this component available to the app
export default TripScreen;
