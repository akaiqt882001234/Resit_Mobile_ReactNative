import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Intro from './app/screens/Intro';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import TripScreen from './app/screens/TripScreen';
import TripDetail from './app/components/TripDetail';
import TripProvider from './app/contexts/TripProvider';

const Stack = createStackNavigator();

export default function App() {
  const [user, setUser] = useState({});
  const findUser = async () => {
    const result = await AsyncStorage.getItem('user');
    if (result !== null) {
      setUser(JSON.parse(result));
    }
  };

  useEffect(() => {
    findUser();
  }, []);

  const RenderTripScreen = props => <TripScreen {...props} user={user} />

  if (!user.name) return <Intro onFinish={findUser} />
  return (
    <NavigationContainer>
      <TripProvider>
        <Stack.Navigator screenOptions={{ headerTitle: '', headerTransparent: true }}>
          <Stack.Screen component={RenderTripScreen} name='TripScreen' />
          <Stack.Screen component={TripDetail} name='TripDetail' />
        </Stack.Navigator>
      </TripProvider>
    </NavigationContainer>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
