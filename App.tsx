/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { View, Text } from 'react-native'
import Profile from './src/Screens/Profile'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PDFExample from './src/Screens/Pdf'
import Form from './src/Screens/Form'

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Profile} />
        <Stack.Screen name="Pdf" component={PDFExample} options={{headerShown:true}}/>
        <Stack.Screen name="Form" component={Form} options={{headerShown:true}}/>
      </Stack.Navigator>
    </NavigationContainer>
    </View>
  );
}
export default App;
