import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View  } from 'react-native';

//  import Main from './components/screens/Main';
//  import Boilerplate from './components/screens/Boilerplate';
//  import ShoppingNav from './components/screens/ShoppingNav';
import CoffeeInitialNav from './components/screens/CoffeeInitialNav';
// import Geoloc from './components/screens/Geoloc';
// import Camera from './components/screens/Camera';

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
