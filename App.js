import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';


import CoffeeInitialNav from './components/screens/CoffeeInitialNav';


class App extends Component {
  constructor(props){
     super(props);
   }
  render() {
    return (
      <CoffeeInitialNav />
    );
  }
}

export default App;
