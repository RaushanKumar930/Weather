import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './components/Home';
import Details from './components/Details';
//import FormScreen from './components/FormScreen';

import FlashScreen from './components/FlashScreen';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='FlashScreen' component={FlashScreen} options={{headerShown:false}} /> 
      <Stack.Screen name='Home' component={Home} options={{headerShown:false,headerTintColor:'#7393B3'}}/> 
      <Stack.Screen name='Details' component={Details} options={{headerShown:true}} /> 
      </Stack.Navigator>
    </NavigationContainer>
  )
}