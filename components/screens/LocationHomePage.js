import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, Alert, TouchableOpacity ,Image, FlatList, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StarRating from 'react-native-star-rating';


class Locationscreen extends Component{
  constructor (props){
    super(props)
    this.state ={
      isLoading: true,
      locationData: [],
      isliked:true,
    }
  }


    getData = async () =>{
      var token = await AsyncStorage.getItem('@session_token')
      const {locID} = this.props.route.params
      return fetch('http://10.0.2.2:3333/api/1.0.0/location/'+locID,{
        headers: { 'Content-Type': 'application/json',
                  'X-Authorization': token
      }
      }
    )
        .then((response) => response.json())
        .then((responseJson) => {

          this.setState({
            isLoading: false,
            locationData: responseJson,
          });

        })
        .catch((error) =>{
          console.log(error);
        });
    }

    componentDidMount(){
      if(isLoading=true){
        this.getData();
      }
    }

    likeReview = async (revId) =>{
      var token = await AsyncStorage.getItem('@session_token')
      const {locID} = this.props.route.params
      return fetch('http://10.0.2.2:3333/api/1.0.0/location/' +locID+ '/review/'+ revId + '/like', {
        method: 'POST',
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
          Alert.alert("Review Liked");
          this.props.navigation.replace('LocationHomePage');
        }

      })
      .catch((error) => {
        console.log(error);
      })
    }

    favLoc = async () =>{
      var token = await AsyncStorage.getItem('@session_token')
      const {locID} = this.props.route.params
      return fetch('http://10.0.2.2:3333/api/1.0.0/location/' +locID+ '/favourite', {
        method: 'POST',
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
          Alert.alert("Location Favourited");
          this.props.navigation.replace('LocationHomePage');
        }

      })
      .catch((error) => {
        console.log(error);
      })
    }


    listEmpty = () => {
    return (
        <View style={styles.notfound}>
            <Text >  </Text>
            <Text > No Reviews Found... </Text>
            <Ionicons name="ios-alert-circle-outline" size={15} />
        </View>
    )
  }



  render(){
    const {locID} = this.props.route.params
    if(this.state.isLoading){
      return(
        <View>
          <ActivityIndicator/>
          <ActivityIndicator size="large" />
        </View>
      )
    }


    return(
      <View style={styles.container}>
          <View style={styles.locations}>
               <Text style={styles.btn}>{this.state.locationData.location_name}</Text>
               <Text >Location: {this.state.locationData.location_town}</Text>

               <View style={styles.stars}>
               <Text >Average Overall Rating:  </Text>
                 <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={this.state.locationData.avg_overall_rating}
                    starSize={10}
                  />
                </View>
              <View style={styles.stars}>
               <Text >Average Price Rating:  </Text>
               <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={this.state.locationData.avg_price_rating}
                  starSize={10}
                />
                </View>

                <View style={styles.stars}>
               <Text >Average Quality Rating:  </Text>
               <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={this.state.locationData.avg_quality_rating}
                  starSize={10}
                />
               </View>

               <View style={styles.stars}>
               <Text >Average Clenliness Rating:  </Text>
               <StarRating
                  disabled={false}
                  maxStars={5}
                  rating={this.state.locationData.avg_clenliness_rating}
                  starSize={10}
                />
               </View>

               <View style={styles.stars}>
               <TouchableOpacity
                   onPress = {() => this.favLoc()}>
                   <Ionicons name="ios-heart-outline" size={15} />
                </TouchableOpacity>
                <Text > Click the heart to Favourite!</Text>
               </View>

            </View>



            <View>
            <TouchableOpacity
                onPress = {() => this.props.navigation.navigate('LocationReviewMaker',{locID: locID})}>
                <Text style={styles.leaveReview}> Leave a review </Text>

             </TouchableOpacity>
            </View>



            <View>
            <Text></Text>
            <Text style={styles.btn}> Reviews for {this.state.locationData.location_name}</Text>
            </View>

            <FlatList
              data={this.state.locationData.location_reviews}
              ListEmptyComponent={this.listEmpty}
              extraData={this.state.locationData.location_reviews}
              keyExtractor={({review_id},index) => review_id.toString()}
              renderItem={({item}) => {
                return(
                <>

                <View style={styles.locations}>
                     <View style={styles.stars}>
                     <Text >Overall Rating:  </Text>
                       <StarRating
                          disabled={false}
                          maxStars={5}
                          rating={item.overall_rating}
                          starSize={10}
                        />
                      </View>
                    <View style={styles.stars}>
                     <Text >Price Rating:  </Text>
                     <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={item.price_rating}
                        starSize={10}
                      />
                      </View>

                      <View style={styles.stars}>
                     <Text >Quality Rating:  </Text>
                     <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={item.quality_rating}
                        starSize={10}
                      />
                     </View>

                     <View style={styles.stars}>
                     <Text >Clenliness Rating:  </Text>
                     <StarRating
                        disabled={false}
                        maxStars={5}
                        rating={item.clenliness_rating}
                        starSize={10}
                      />
                     </View>
                     <Text >Review Comments:  {item.review_body}</Text>

                     <View style={{justifyContent: 'center', alignItems: 'center',marginTop: 16,}}>
                     <Image
                     source={{
                       uri: 'http://10.0.2.2:3333/api/1.0.0/location/'+ locID + '/review/'+ item.review_id +'/photo'}}
                     style={{ width: 150, height: 150 }}
                     />
                     </View>

                     <View style={styles.stars}>
                     <TouchableOpacity
                         onPress = {() => this.likeReview(item.review_id)}>
                         <Ionicons name="ios-thumbs-up-outline" size={15} />
                      </TouchableOpacity>
                      <Text > Likes: {item.likes}</Text>
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

export default Locationscreen
