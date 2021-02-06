import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, TextInput, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';

class shoppingADD extends Component{
  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      shoppingListData: [],

      id: '',
      item_name: '',
      description: '',
      unit_price: '',
      quantity: ''

    }
  }

  handleid = (id) => {
  this.setState({id: parseInt(id)})
  }
  handleitem_name = (item_name) => {
  this.setState({item_name: item_name})
  }
  handledescription = (description) => {
  this.setState({description: description})
  }
  handleunit_price = (unit_price) => {
  this.setState({unit_price: parseInt(unit_price)})
  }
  handlequantity = (quantity) => {
  this.setState({quantity: parseInt(quantity)})
  }


  getData(){
    return fetch('http://10.0.2.2:3333/list')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          shoppingListData: responseJson,
        });

      })
      .catch((error) =>{
        console.log(error);
      });
  }

  componentDidMount(){
      this.getData();
  }

  deleteItem(id){
  return fetch('http://10.0.2.2:3333/list/' + id, {
      method: 'delete'
    })
    .then((response) => {
        this.getData();
    })
    .then((response) => {

      Alert.alert("Item deleted")

    })
    .catch((error) =>{
      console.log(error);
    });
}

addItem(){
    return fetch("http://10.0.2.2:3333/list",
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: this.state.id,
        item_name: this.state.item_name,
        description: this.state.description,
        unit_price: this.state.unit_price,
        quantity: this.state.quantity
      })
    })
    .then((response) => {
      Alert.alert("Item Added!");

    })
    .catch((error) => {
      console.error(error);
    });
  }





render(){

    if(this.state.isLoading){
      return(
        <View>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={styles.container}>
             <TextInput style={styles.items} placeholder="ID..." onChangeText={this.handleid} value={this.state.id.toString()} />
             <TextInput style={styles.items} placeholder="Item Name..." onChangeText={this.handleitem_name} value={this.state.item_name.toString()} />
             <TextInput style={styles.items} placeholder="Description..." onChangeText={this.handledescription} value={this.state.description.toString()} />
             <TextInput style={styles.items} placeholder="Price per unit..." onChangeText={this.handleunit_price} value={this.state.unit_price.toString()} />
             <TextInput style={styles.items} placeholder="Quantity..." onChangeText={this.handlequantity} value={this.state.quantity.toString()} />

             <TouchableOpacity
                 onPress = {() => this.addItem()}>
                 <Text style={styles.btn}> Add Item </Text>
              </TouchableOpacity>
          </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
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
   borderColor: "#F6F7EB",
   borderRadius: 6,
   backgroundColor: "#E2E8CE",
   textAlign: "center",
   fontSize: 16,
   fontWeight: "bold"
 }
});


export default shoppingADD;
