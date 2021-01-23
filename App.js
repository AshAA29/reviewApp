import React, { Component } from 'react';
import { Text, View } from 'react-native';

class SayHello extends Component {
  render(){
    return (
      <View>
        <Text>Hello {this.props.name}</Text>
      </View>
    )
  };
}

class HelloWorldApp extends Component {
  render(){
    return (
      <View>
        <SayHello name="Ash" />
        <SayHello name="Josh" />
        <SayHello name="Sarah" />
      </View>
    );
  }
}


export default HelloWorldApp
