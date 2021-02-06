import React, { Component } from 'react';
import { FlatList, ActivityIndicator, Text, View, TouchableOpacity, StyleSheet, Alert } from 'react-native';

class shoppingViewDel extends Component{
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


render(){

    if(this.state.isLoading){
      return(
        <View>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View>
        <FlatList
          data={this.state.shoppingListData}
          extraData={this.state.shoppingListData}
          renderItem={({item}) => {
            return(
            <>
             <Text style={styles.items}>{item.item_name}</Text>
            <TouchableOpacity onPress={() => this.deleteItem(this.props.id)}><Text style={styles.btn}>Delete</Text></TouchableOpacity>
            </>
            )

            }}
          keyExtractor={({id},index) => id.toString()}


        />
        <TouchableOpacity
            onPress = {() => this.getData()}>
            <Text style={styles.btn}> Refresh List </Text>
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
   backgroundColor: "#F6F7EB",
   textAlign: "center",
   fontSize: 16,
   fontWeight: "bold"
 }
});


export default shoppingViewDel;
