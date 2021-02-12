import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LocationHomePage from './LocationHomePage';
import LocationReviewMaker from './LocationReviewMaker';

const Stack = createStackNavigator();

export default function coffeeLocationNav() {
 return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="LocationHomePage" component={LocationHomePage} />
            <Stack.Screen name="LocationReviewMaker" component={LocationReviewMaker} />
        </Stack.Navigator>
  );
}
