import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CoffeeNav from './CoffeeNav';
import CoffeeLogin from './CoffeeLogin';
import CoffeeSignUp from './CoffeeSignUp';
import CoffeeLocationNav from './CoffeeLocationNav';

const Stack = createStackNavigator();

export default function Main() {
 return (
   <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="CoffeeLogin" component={CoffeeLogin} />
        <Stack.Screen name="CoffeeSignUp" component={CoffeeSignUp} />
        <Stack.Screen name="CoffeeNav" component={CoffeeNav} />
        <Stack.Screen name="CoffeeLocationNav" component={CoffeeLocationNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
