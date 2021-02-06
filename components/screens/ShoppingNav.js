import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
//import { createStackNavigator } from '@react-navigation/stack';
//import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

//import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

import ShoppingViewDel from './ShoppingViewDel';
import ShoppingADD from './ShoppingADD';
import ShoppingEdit from './ShoppingEdit';
//import ContactScreen from './ContactScreen';

//const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

//const Drawer = createDrawerNavigator();

export default function Main() {
 return (
     <NavigationContainer>
     <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'ShoppingList') {
              iconName = focused
                ? 'ios-cart'
                : 'ios-cart-outline';
            }
            if (route.name === 'ShoppingADD') {
              iconName = focused
                ? 'ios-add-circle'
                : 'ios-add-circle-outline';
            }
            if (route.name === 'ShoppingEdit') {
              iconName = focused
                ? 'ios-create'
                : 'ios-create-outline';
            }


            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
            <Tab.Screen name="ShoppingList" component={ShoppingViewDel} />
            <Tab.Screen name="ShoppingADD" component={ShoppingADD} />
            <Tab.Screen name="ShoppingEdit" component={ShoppingEdit} />
        </Tab.Navigator>
     </NavigationContainer>
  );
}

// Hide the header in Stack Navivator
//<Stack.Navigator> screenOptions={{headerShown: false}}>

// icons for tab nav
// <Tab.Navigator
//    screenOptions={({ route }) => ({
//      tabBarIcon: ({ focused, color, size }) => {
//        let iconName;
//
//        if (route.name === 'Home') {
//          iconName = focused
//            ? 'ios-home'
//            : 'ios-home-outline';
//        }
//        if (route.name === 'About') {
//          iconName = focused
//            ? 'ios-information-circle'
//            : 'ios-information-circle-outline';
//        }
//        if (route.name === 'Contact') {
//          iconName = focused
//            ? 'ios-call'
//            : 'ios-call-outline';
//        }
//
//
//        // You can return any component that you like here!
//        return <Ionicons name={iconName} size={size} color={color} />;
//      },
//    })}
//    tabBarOptions={{
//      activeTintColor: 'tomato',
//      inactiveTintColor: 'gray',
//    }}
//  >
