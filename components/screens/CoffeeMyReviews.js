import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, Image, Alert, TouchableOpacity , FlatList, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';

class coffeeMyReviews extends Component {
  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      userData: [],
      imageTemp:[],
      displayImage:true,
    }
  }

  onErrorLoadingImage = () => {
    this.setState({displayImage:false})
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

  deleteMyReviews = async (revID,locID) =>{
    var token = await AsyncStorage.getItem('@session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' +locID+ '/review/'+ revID, {
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
        Alert.alert("Review Deleted");
        this.props.navigation.replace('CoffeeMyReviews');
      }

    })
    .catch((error) => {
      console.log(error);
    })
  }


  deletePic = async (locID,revID) =>{
    var token = await AsyncStorage.getItem('@session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/location/' +locID+ '/review/'+ revID+'/photo', {
      method: 'delete',
      headers: { 'Content-Type' : 'image/jpeg',
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
        Alert.alert("Image Deleted");
        this.props.navigation.replace('CoffeeMyReviews');
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

imageTest = (locID,revID) =>{
  return(
    <View style={{justifyContent: 'center', alignItems: 'center',marginTop: 16}}>
    <Image
    source={{
      uri: 'http://10.0.2.2:3333/api/1.0.0/location/'+ locID + '/review/'+ revID +'/photo',
      method:'GET'
    }}
    style={{ width: 80, height: 80 }}
    />
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
    <Text style={styles.btn}> My Liked Reviews</Text>
    </View>



    <FlatList
      data={this.state.userData.reviews}
      extraData={this.state.userData.reviews}
      ListEmptyComponent={this.listEmpty}
      keyExtractor={(item,index) =>"" + index}
      renderItem={({item}) => {
        return(
        <>

        <View style={styles.locations}>



             <Text style={styles.btn}>{item.location.location_name}</Text>
             <Text >Location: {item.location.location_town}</Text>

             <View style={styles.stars}>
             <Text >Average Overall Rating:  </Text>
               <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={item.review.overall_rating}
                  starSize={10}
                />
              </View>

            <View style={styles.stars}>
             <Text >Average Price Rating:  </Text>
             <StarRating
                disabled={false}
                maxStars={5}
                rating={item.review.price_rating}
                starSize={10}
              />
              </View>

              <View style={styles.stars}>
             <Text >Average Quality Rating:  </Text>
             <StarRating
                disabled={false}
                maxStars={5}
                rating={item.review.quality_rating}
                starSize={10}
              />
             </View>

             <View style={styles.stars}>
             <Text >Average Clenliness Rating:  </Text>
             <StarRating
                disabled={false}
                maxStars={5}
                rating={item.review.clenliness_rating}
                starSize={10}
              />
             </View>

             <Text >Review Comments:  {item.review.review_body}</Text>
             <View style={styles.stars}>
                 <Ionicons name="ios-thumbs-up-outline" size={15} />
              <Text > Likes: {item.review.likes}</Text>
             </View>


             <View style={{justifyContent: 'center', alignItems: 'center',marginTop: 16}}>
             <Image
             source={{uri: 'http://10.0.2.2:3333/api/1.0.0/location/'+ item.location.location_id + '/review/'+ item.review.review_id +'/photo'}}
             style={{ width: 80, height: 80 }}
             />
             </View>

             <View>
             <TouchableOpacity
                 onPress = {() => this.props.navigation.navigate('LocationCamera',{revID:item.review.review_id,locID:item.location.location_id})}>
                 <Text style={styles.leaveReview}> Add a pic </Text>
              </TouchableOpacity>
              </View>

              <View>
              <TouchableOpacity
                  onPress = {() =>this.deletePic(item.location.location_id,item.review.review_id)}>
                  <Text style={styles.leaveReview}> Delete pic </Text>
               </TouchableOpacity>
               </View>

              <View>
              <TouchableOpacity
                  onPress = {() => this.props.navigation.navigate('CoffeeMyReviewsEdit',{revID:item.review.review_id,locID:item.location.location_id})}>
                  <Text style={styles.leaveReview}> Edit review </Text>
               </TouchableOpacity>
               </View>

             <View>
             <TouchableOpacity
                 onPress = {() => this.deleteMyReviews(item.review.review_id,item.location.location_id)}>
                 <Text style={styles.leaveReview}> Remove review </Text>
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

 },
 tinyLogo: {
    width: 50,
    height: 50,
  },
});

export default coffeeMyReviews
