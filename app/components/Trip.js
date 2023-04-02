//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import colors from '../misc/colors';
import { TouchableOpacity } from 'react-native';

// create a component
const Trip = ({ item, onPress }) => {
    const { title, dest, date, risk, desc } = item;
    return (

        <TouchableOpacity onPress={onPress} style={styles.container}>
            <Text style={styles.title} numberOfLines={2}>{title}</Text>
            <Text numberOfLines={3}>Destination: {dest}</Text>
            <Text numberOfLines={4}>Date: {date}</Text>
            <Text numberOfLines={5}>Require Risk: {risk}</Text>
            <Text numberOfLines={6}>Description: {desc}</Text>
        </TouchableOpacity>

    );
};

const width = Dimensions.get('window').width - 40
// define your styles
const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.PRIMARY,
        width: width / 2 - 10,
        padding: 8,
        borderRadius: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15,
        color: colors.LIGHT,
    }
});

//make this component available to the app
export default Trip;
