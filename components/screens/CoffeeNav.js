import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import CoffeeHomeScreen from './CoffeeHomeScreen';
import CoffeeProfileNav from './CoffeeProfileNav';
import CoffeeActivityNav from './CoffeeActivityNav'

const Tab = createBottomTabNavigator();


export default function secondaryNav(){
 return (
     <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-cafe'
                : 'ios-cafe-outline';
            }
            if (route.name === 'Profile') {
              iconName = focused
                ? 'ios-person-circle'
                : 'ios-person-circle-outline';
            }
            if (route.name === 'MyPicks') {
              iconName = focused
                ? 'ios-heart-circle'
                : 'ios-heart-circle-outline';
            }


            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'purple',
          inactiveTintColor: 'gray',
        }}
      >
            <Tab.Screen name="Home" component={CoffeeHomeScreen} />
            <Tab.Screen name="Profile" component={CoffeeProfileNav} />
            <Tab.Screen name="MyPicks" component={CoffeeActivityNav} />
        </Tab.Navigator>
  );
}
