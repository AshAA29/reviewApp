import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


class coffeeEditProfile extends Component {
  constructor(props){
    super(props);
    this.state = {

      first_nameOG: '',
      last_nameOG: '',
      emailOG: '',

      first_name: '',
      last_name: '',
      email: '',
      profileData:[]
    }
  }

  handleFirstName = (first_name) => {
  this.setState({first_name: first_name})
  }

  handleLastName = (last_name) => {
  this.setState({last_name: last_name})
  }

  handleInputEmail = (email) => {
  this.setState({email: email})
  }

  getData = async () =>{
    var token = await AsyncStorage.getItem('@session_token')
    var userID = await AsyncStorage.getItem('@user_id')
    return fetch('http://10.0.2.2:3333/api/1.0.0/user/'+userID,{
      headers: { 'Content-Type': 'application/json',
                'X-Authorization': token
    }
    }
  )
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          profileData: responseJson,
        });

      })
      .catch((error) =>{
        console.log(error);
      });
  }

  componentDidMount(){
      this.getData();
  }

  editItem = async () =>{
    var userID = await AsyncStorage.getItem('@user_id')
    var token = await AsyncStorage.getItem('@session_token')
    let reply = {};

    if(this.state.first_name != this.state.profileData.first_nameOG){
      reply['first_name'] = this.state.first_name;
    }
    if(this.state.last_name != this.state.profileData.last_nameOG){
      reply['last_name'] = this.state.last_name;
    }
    if(this.state.email != this.state.profileData.emailOG){
      reply['email'] = this.state.email;
    }


    return fetch('http://10.0.2.2:3333/api/1.0.0/user/' + userID, {
      method: 'patch',
      headers: { 'Content-Type' : 'application/json',
                'X-Authorization': token
    },
      body: JSON.stringify(reply)
    })
    .then((response) => {
      if (response.status === 404) {
        throw 'Not Found'
      }
      if (response.status === 400) {
        Alert.alert("Bad request");
      }
      else if (response.status === 200) {
        Alert.alert("Profile Updated");
        this.props.navigation.navigate('Profile');
      }

    })
    .catch((error) => {
      console.log(error);
    })
  }



  render() {
    return (
      <View style={styles.container}>
       <TextInput style={styles.items} placeholder="Enter First Name..." onChangeText={this.handleFirstName} value={this.state.first_name} />
       <TextInput style={styles.items} placeholder="Enter Last Name..." onChangeText={this.handleLastName} value={this.state.last_name} />
       <TextInput style={styles.items} placeholder="Enter Email..." onChangeText={this.handleInputEmail} value={this.state.email} />
       <TouchableOpacity
           onPress = {() => this.editItem()}>
           <Text style={styles.btn}> Update Profile </Text>
        </TouchableOpacity>
        <TouchableOpacity
            onPress = {() => this.props.navigation.navigate('Profile')}>
            <Text style={styles.btn}> Go Back </Text>
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

export default coffeeEditProfile
