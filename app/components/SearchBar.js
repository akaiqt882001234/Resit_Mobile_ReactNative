//import liraries
import React, { Component } from 'react';
import { TextInput } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../misc/colors';

// create a component
const SearchBar = ({ containerStyle }) => {
    return (
        <View style={[styles.container, { ...containerStyle }]}>
            <TextInput placeholder='Search Trip...' style={styles.searchBar} />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    searchBar: {
        borderWidth: 0.5,
        borderColor: colors.PRIMARY,
        height: 40,
        paddingLeft: 20,
        borderRadius: 40,
        fontSize: 20,
        backgroundColor: '#FFF',
    },
});

//make this component available to the app
export default SearchBar;
