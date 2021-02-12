import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, Alert, TouchableOpacity , FlatList, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';

class coffeeFavourites extends Component {
  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      userData: []
    }
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
          isLoading: false,
          userData: responseJson,
        });

      })
      .catch((error) =>{
        console.log(error);
      });
  }

  dislikeLocation = async (locID) =>{
    var token = await AsyncStorage.getItem('@session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' +locID+ '/favourite', {
      method: 'delete',
      headers: { 'Content-Type' : 'application/json',
                'X-Authorization': token
    }
    })
    .then((response) => {
      if (response.status === 404) {
        throw 'Not Found'
      }
      if (response.status === 400) {
        Alert.alert("Bad request");
      }
      else if (response.status === 200) {
        Alert.alert("Removed Location from Favourites");
        this.props.navigation.replace('CoffeeFavourites');
      }

    })
    .catch((error) => {
      console.log(error);
    })
  }


  componentDidMount () {
    this.getData();
  }

  DealWithPress(item) {
    Alert.alert(item.toString());
  }

  listEmpty = () => {
  return (
      <View style={styles.notfound}>
          <Text >  </Text>
          <Text > No Favourite Locations Found... </Text>
          <Ionicons name="ios-alert-circle-outline" size={15} />
      </View>
  )
}



  render() {
    if(this.state.isLoading){
      return(
        <View>
          <ActivityIndicator/>
          <ActivityIndicator size="large" />
        </View>
      )
    }
    return (
      <View style={styles.container}>
      <View>
      <Text style={styles.btn}> My Favourite Places</Text>
      </View>
      <FlatList
        data={this.state.userData.favourite_locations}
        extraData={this.state.userData.favourite_locations}
        ListEmptyComponent={this.listEmpty}
        keyExtractor={({location_id,index}) =>location_id.toString()}
        renderItem={({item}) => {
          return(
          <>

          <View style={styles.locations}>
               <Text style={styles.btn}>{item.location_name}</Text>
               <Text >Location: {item.location_town}</Text>

               <View style={styles.stars}>
               <Text >Average Overall Rating:  </Text>
                 <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={item.avg_overall_rating}
                    starSize={10}
                  />
                </View>
              <View style={styles.stars}>
               <Text >Average Price Rating:  </Text>
               <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={item.avg_price_rating}
                  starSize={10}
                />
                </View>

                <View style={styles.stars}>
               <Text >Average Quality Rating:  </Text>
               <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={item.avg_quality_rating}
                  starSize={10}
                />
               </View>

               <View style={styles.stars}>
               <Text >Average Clenliness Rating:  </Text>
               <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={item.avg_clenliness_rating}
                  starSize={10}
                />
               </View>

               <View>
               <TouchableOpacity
                   onPress = {() => this.dislikeLocation(item.location_id)}>
                   <Text style={styles.leaveReview}> Remove from favourite places </Text>
                </TouchableOpacity>
                </View>
            </View>
          </>
          )

          }}



      />
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
   paddingVertical: 8,
   borderWidth: 4,
   borderColor: "#F6F7EB",
   borderRadius: 6,
   backgroundColor: "#432534",
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
   fontWeight: "bold",

 },
 locations: {
   marginTop: 16,
   paddingVertical: 8,
   borderWidth: 4,
   borderColor: "#EEEEEE",
   borderRadius: 6,
   backgroundColor: "#EEEEEE",
   textAlign: "center",
   fontSize: 16,
   fontWeight: "bold",

 },
 stars: {
   alignItems: 'center',
   flexDirection: 'row',

 },
 notfound: {
   flexDirection: 'row',
   justifyContent:"center",
   backgroundColor: "#EEEEEE",
   paddingVertical: 8,
   borderWidth: 4,
   borderColor: "#EEEEEE",
   borderRadius: 6,
   backgroundColor: "#EEEEEE",
   fontSize: 16,
   fontWeight: "bold",

 },
 leaveReview:{
   flexDirection: 'row',
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

 }
});

export default coffeeFavourites
