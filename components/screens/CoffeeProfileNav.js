import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CoffeeEditProfile from './CoffeeEditProfile';
import CoffeeProfile from './CoffeeProfile';
const Stack = createStackNavigator();

export default function coffeeProfileNav() {
 return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Profile" component={CoffeeProfile} />
            <Stack.Screen name="EditProfile" component={CoffeeEditProfile} />
        </Stack.Navigator>
  );
}
