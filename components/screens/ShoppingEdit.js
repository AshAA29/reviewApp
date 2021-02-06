import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, TextInput, View, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

class shoppingEdit extends Component{
  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      shoppingListData: [],


      idOG: '',
      item_nameOG: '',
      descriptionOG: '',
      unit_priceOG: '',
      quantityOG: '',


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

  getItemData(id){
    return fetch('http://10.0.2.2:3333/list/' + id)
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          idOG: responseJson.id,
          item_nameOG: responseJson.item_name,
          descriptionOG: responseJson.description,
          unit_priceOG: responseJson.unit_price,
          quantityOG: responseJson.quantity
        });

      })
      .catch((error) =>{
        console.log(error);
      });
  }

  componentDidMount(){
      this.getData();
  }

  editItem(){
    this.getItemData(this.state.id);
    let reply = {};

    if(this.state.id != this.state.idOG){
      reply['id'] = parseInt(this.state.id);
    }
    if(this.state.item_name != this.state.item_nameOG){
      reply['item_name'] = this.state.item_name;
    }
    if(this.state.description != this.state.descriptionOG){
      reply['description'] = this.state.description;
    }
    if(this.state.unit_price != this.state.unit_priceOG){
      reply['unit_price'] = parseInt(this.state.unit_price);
    }
    if(this.state.quantity != this.state.quantityOG){
      reply['quantity'] = parseInt(this.state.quantity);
    }

    return fetch('http://10.0.2.2:3333/list/' + this.state.id, {
      method: 'patch',
      headers: { 'Content-Type' : 'application/json'},
      body: JSON.stringify(reply)
    })
    .then((response) => {
      Alert.alert("Item Updated");
    })
    .catch((error) => {
      console.log(error);
    })
  }


  deleteItem(id){
  return fetch('http://10.0.2.2:3333/list/' + id, {
      method: 'delete'
    })
    .then((response) => {
        this.getData();
    })
    .then((response) => {
      Alert.alert("Item deleted");
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
                 onPress = {() => this.editItem()}>
                 <Text style={styles.btn}> Edit Item </Text>
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


export default shoppingEdit;
