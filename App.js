import React, { Component } from 'react';
import { Text, View, TextInput, Button, FlatList } from 'react-native';

class HelloWorldApp extends Component {
  constructor(props) {
      super(props);
      this.state = {
             newData: '',
             text:''
           }
         }

handleTextInput = (text) =>
{
  this.setState({newData: text})
}

handleButtonPress()
{
  this.setState({text: this.state.newData})
}

render(){
    return (
      <View>
        <TextInput placeholder="Type here!" onChangeText={this.handleTextInput} value={this.state.newData} />
        <Button title="Add" onPress={() => this.handleButtonPress()}/>
        <FlatList data={this.state.text} renderItem = {item => (<Text>{this.state.text}</Text>)} />
      </View>
    );
  }
}

export default HelloWorldApp
