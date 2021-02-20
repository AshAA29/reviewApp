import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Filter from 'bad-words';

class coffeeMyReviewsEdit extends Component {
  constructor(props){
    super(props);
    this.state = {
      overall_rating: '',
      price_rating: '',
      quality_rating: '',
      clenliness_rating:'',
      review_body:''
    }
  }

  handleOverallRating = (overall_rating) => {
  this.setState({overall_rating: overall_rating})
  }
  handlePriceRating = (price_rating) => {
  this.setState({price_rating: price_rating})
  }
  handleQualityRating = (quality_rating) => {
  this.setState({quality_rating: quality_rating})
  }
  handleClenlinessRating = (clenliness_rating) => {
  this.setState({clenliness_rating: clenliness_rating})
  }
  handleReviewBody = (review_body) => {
  this.setState({review_body: review_body})
  }



    editReview = async () =>{
      var token = await AsyncStorage.getItem('@session_token')
      const {revID,locID} = this.props.route.params
      let review = {};

      var filter = new Filter();
      filter.addWords('tea', 'cakes', 'pastries');

      review['overall_rating']=parseInt(this.state.overall_rating)
      review['price_rating']=parseInt(this.state.price_rating)
      review['quality_rating']=parseInt(this.state.quality_rating)
      review['clenliness_rating']=parseInt(this.state.clenliness_rating)
      review['review_body']=filter.clean(this.state.review_body)


      return fetch('http://10.0.2.2:3333/api/1.0.0/location/' + locID +'/review/' + revID, {
        method: 'patch',
        headers: { 'Content-Type' : 'application/json',
                  'X-Authorization': token
      },
        body: JSON.stringify(review)
      })
      .then((response) => {
        if (response.status === 404) {
          throw 'Not Found'
        }
        if (response.status === 400) {
          Alert.alert("Bad request");
        }
        else if (response.status === 200) {
          Alert.alert("Review Edited");
          this.props.navigation.replace('CoffeeMyReviews');
        }

      })
      .catch((error) => {
        console.log(error);
      })
    }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.icon}>
        <Ionicons name="ios-pencil-outline" size={100} />
        </View>
        <ScrollView>
       <TextInput style={styles.items} placeholder="Enter Overall Rating..." onChangeText={this.handleOverallRating} value={this.state.overall_rating} />
       <TextInput style={styles.items} placeholder="Enter Price Rating..." onChangeText={this.handlePriceRating} value={this.state.price_rating} />
       <TextInput style={styles.items} placeholder="Enter Quality Rating..." onChangeText={this.handleQualityRating} value={this.state.quality_rating} />
       <TextInput style={styles.items} placeholder="Enter Clenliness Rating..." onChangeText={this.handleClenlinessRating} value={this.state.clenliness_rating} />
       <TextInput style={styles.items} placeholder="Enter Review Description..." onChangeText={this.handleReviewBody} value={this.state.review_body} />
       <TouchableOpacity
           onPress = {() => this.editReview()}>
           <Text style={styles.btn}> Edit Review </Text>
        </TouchableOpacity>
        </ScrollView>
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
 },
 icon: {
   alignItems: 'center',
   textAlign: "center",
 }
});

export default coffeeMyReviewsEdit
