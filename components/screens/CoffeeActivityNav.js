import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CoffeeFavourites from './CoffeeFavourites';
import CoffeeLikes from './CoffeeLikes';
import CoffeeActivityMenu from './CoffeeActivityMenu'
import CoffeeMyReviews from './CoffeeMyReviews'
import CoffeeMyReviewsEdit from './CoffeeMyReviewsEdit'
import LocationCamera from './LocationCamera';
const Stack = createStackNavigator();

export default function coffeeActivityNav() {
 return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="CoffeeActivityMenu" component={CoffeeActivityMenu} />
          <Stack.Screen name="CoffeeFavourites" component={CoffeeFavourites} />
          <Stack.Screen name="CoffeeLikes" component={CoffeeLikes} />
          <Stack.Screen name="CoffeeMyReviews" component={CoffeeMyReviews} />
          <Stack.Screen name="CoffeeMyReviewsEdit" component={CoffeeMyReviewsEdit} />
          <Stack.Screen name="LocationCamera" component={LocationCamera} />
        </Stack.Navigator>
  );
}
