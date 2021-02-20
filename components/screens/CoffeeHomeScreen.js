import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, Alert, TouchableOpacity , FlatList, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import StarRating from 'react-native-star-rating';
//import CoffeeNav from './CoffeeNav';

class coffeeHomeScreen extends Component {
  constructor(props){
    super(props);
    this.state ={
      isLoading: true,
      locationData: [],
      search: ''
    }
  }

  handleInputsearch = (search) => {
  this.setState({search: search})
  }

  getData = async () =>{
    var token = await AsyncStorage.getItem('@session_token')
    return fetch('http://10.0.2.2:3333/api/1.0.0/find',{
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
      this.getData();
  }

  DealWithPress(item) {
    Alert.alert(item.toString());
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

      <TextInput style={styles.items} placeholder="Enter Location to search..." onChangeText={this.handleInputsearch} value={this.state.search} />

      <FlatList
        data={this.state.locationData}
        extraData={this.state.locationData}
        keyExtractor={({location_id},index) => location_id.toString()}
        renderItem={({item}) => {

          if(this.state.search.trim().length===0){
            return(
            <>

            <View style={styles.locations}>
             <TouchableOpacity
                 onPress = {() => this.props.navigation.navigate('CoffeeLocationNav', {screen: 'LocationHomePage',params: { locID: item.location_id }})}>
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

              </TouchableOpacity>
              </View>
            </>
            )
          }

          else if(item.location_name.toLowerCase().includes(this.state.search.toLowerCase())){
            return(
            <>

            <View style={styles.locations}>
             <TouchableOpacity
                 onPress = {() => this.props.navigation.navigate('CoffeeLocationNav', {screen: 'LocationHomePage',params: { locID: item.location_id }})}>
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

              </TouchableOpacity>
              </View>
            </>
            )
          }




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
 btn2: {
   marginTop: 2,
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

export default coffeeHomeScreen
