import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';


class coffeSignUp extends Component {
  constructor(props){
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      password: ''
    }
  }

  handleFirstName = (first_name) => {
    this.setState({first_name: first_name})
  }
  handleSecondName = (last_name) => {
    this.setState({last_name: last_name})
  }
  handleInputEmail = (email) => {
    this.setState({email: email})
  }
  handleInputPassword = (password) => {
    this.setState({password: password})
  }

  addItem(){
      return fetch("http://10.0.2.2:3333/api/1.0.0/user",
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          email: this.state.email,
          password: this.state.password
        })
      })
      .then((response) => {
        this.props.navigation.navigate('CoffeeLogin');

      })
      .catch((error) => {
        console.error(error);
      });
    }



  render() {
    return (
      <View style={styles.container}>
       <TextInput style={styles.items} placeholder="Enter First Name..." onChangeText={this.handleFirstName} value={this.state.first_name} />
       <TextInput style={styles.items} placeholder="Enter Second Name..." onChangeText={this.handleSecondName} value={this.state.last_name} />
       <TextInput style={styles.items} placeholder="Enter Email..." onChangeText={this.handleInputEmail} value={this.state.email} />
       <TextInput style={styles.items} secureTextEntry={true} placeholder="Enter Password..." onChangeText={this.handleInputPassword} value={this.state.password}  />
       <TouchableOpacity
           onPress = {() => this.addItem()}>
           <Text style={styles.btn}> Sign Up </Text>
        </TouchableOpacity>
      </View>

    );
  }

}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   justifyContent: "center",
   padding: 24,
   backgroundColor: "#F6F7EB"
 },
 btn: {
   marginTop: 16,
   paddingVertical: 8,
   borderWidth: 4,
   borderColor: "#F6F7EB",
   borderRadius: 6,
   backgroundColor: "#5C415D",
   color: "#F6F7EB",
   textAlign: "center",
   fontSize: 16,
   fontWeight: "bold"
 },
 items: {
   marginTop: 16,
   paddingVertical: 8,
   borderWidth: 4,
   borderColor: "#EEEEEE",
   borderRadius: 6,
   backgroundColor: "#EEEEEE",
   textAlign: "center",
   fontSize: 16,
   fontWeight: "bold"
 }
});

export default coffeSignUp
