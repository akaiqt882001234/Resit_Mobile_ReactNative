//import liraries
import React, { useContext, useEffect, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { View, Text, StyleSheet, Keyboard } from 'react-native';
import colors from '../misc/colors';
import SearchBar from '../components/SearchBar';
import RoundIconBtn from '../components/RoundIconBtn';
import TripInputModal from '../components/TripInputModal';
import { TouchableWithoutFeedback } from 'react-native-web';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Trip from '../components/Trip';
import { useTrips } from '../contexts/TripProvider';

// create a component
const TripScreen = ({ user, navigation }) => {
    const [greet, setGreet] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const { trips, setTrips } = useTrips();

    //Set day status with real time
    const findGreet = () => {
        const hrs = new Date().getHours();
        if (hrs === 0 || hrs < 12) return setGreet('Morning');
        if (hrs === 1 || hrs < 17) return setGreet('Afternoon');
        setGreet('Evening');
    };

    useEffect(() => {
        findGreet();
    }, []);

    //Sumbit for update trip
    const handleOnSubmit = async (title, dest, date, risk, desc) => {
        // console.log(title, dest, date, risk, desc)        
        const trip = { id: Date.now(), title, dest, date, risk, desc, time: Date.now() };
        // console.log(note);
        const updateTrips = [...trips, trip];
        setTrips(updateTrips)
        await AsyncStorage.setItem('trips', JSON.stringify(updateTrips))
    };

    const openTrip = (trip) => {
        navigation.navigate('TripDetail', { trip });
    };

    return (
        <>
            <StatusBar barStyle='dark-content' backgroundColor={colors.LIGHT} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <Text style={styles.header}>{`Good ${greet} ${user.name}`}</Text>

                    {trips.length ? <SearchBar containerStyle={{ marginVertical: 15 }} /> : null}
                    <FlatList
                        data={trips}
                        numColumns={2}
                        columnWrapperStyle={{
                            justifyContent: 'space-between',
                            marginBottom: 22,
                        }}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <Trip onPress={() => openTrip(item)} item={item} />
                        )}
                    />
                    {!trips.length ? (
                        <View style={[StyleSheet.absoluteFillObject, styles.emptyHeaderContainer]}>
                            <Text style={styles.emptyHeader}>Add Trips</Text>
                        </View>
                    ) : null}
                </View>
            </TouchableWithoutFeedback>
            <RoundIconBtn
                onPress={() => setModalVisible(true)}
                antIconName='plus'
                style={styles.addButton}
            />
            <TripInputModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleOnSubmit}

            />
        </>
    );
};

// define your styles
const styles = StyleSheet.create({
    header: {
        fontSize: 20,
        fontWeight: 'bold',

    },
    container: {
        paddingHorizontal: 20,
        paddingTop: 15,
        flex: 1,
        zIndex: -1,

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
