import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import StarRating from "react-native-star-rating";

class coffeeLikes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userData: [],
    };
  }

  getData = async () => {
    var token = await AsyncStorage.getItem("@session_token");
    var userID = await AsyncStorage.getItem("@user_id");
    return fetch("http://10.0.2.2:3333/api/1.0.0/user/" + userID, {
      headers: { "Content-Type": "application/json", "X-Authorization": token },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false,
          userData: responseJson,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  dislikeReview = async (revID, locID) => {
    var token = await AsyncStorage.getItem("@session_token");
    return fetch(
      "http://10.0.2.2:3333/api/1.0.0/location/" +
        locID +
        "/review/" +
        revID +
        "/like",
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": token,
        },
      }
    )
      .then((response) => {
        if (response.status === 404) {
          throw "Not Found";
        }
        if (response.status === 400) {
          Alert.alert("Bad request");
        } else if (response.status === 200) {
          Alert.alert("Review disliked");
          this.props.navigation.replace("CoffeeLikes");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.getData();
  }

  DealWithPress(item) {
    Alert.alert(item.toString());
  }

  listEmpty = () => {
    return (
      <View style={styles.notfound}>
        <Text> </Text>
        <Text> No Reviews Found... </Text>
        <Ionicons name="ios-alert-circle-outline" size={15} />
      </View>
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.btn}> My Liked Reviews</Text>
        </View>
        <FlatList
          data={this.state.userData.liked_reviews}
          extraData={this.state.userData.liked_reviews}
          ListEmptyComponent={this.listEmpty}
          keyExtractor={(item, index) => "" + index}
          renderItem={({ item }) => (
            <>
              <View style={styles.locations}>
                <Text style={styles.btn}>{item.location.location_name}</Text>
                <Text>Location: {item.location.location_town}</Text>

                <View style={styles.stars}>
                  <Text>Average Overall Rating: </Text>
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={item.review.overall_rating}
                    starSize={10}
                  />
                </View>
                <View style={styles.stars}>
                  <Text>Average Price Rating: </Text>
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={item.review.price_rating}
                    starSize={10}
                  />
                </View>

                <View style={styles.stars}>
                  <Text>Average Quality Rating: </Text>
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={item.review.quality_rating}
                    starSize={10}
                  />
                </View>

                <View style={styles.stars}>
                  <Text>Average Clenliness Rating: </Text>
                  <StarRating
                    disabled={false}
                    maxStars={5}
                    rating={item.review.clenliness_rating}
                    starSize={10}
                  />
                </View>

                <Text>Review Comments: {item.review.review_body}</Text>
                <View style={styles.stars}>
                  <Ionicons name="ios-thumbs-up-outline" size={15} />
                  <Text> Likes: {item.review.likes}</Text>
                </View>

                <CostumImg item={item} />

                <View>
                  <TouchableOpacity
                    onPress={() =>
                      this.dislikeReview(
                        item.review.review_id,
                        item.location.location_id
                      )
                    }
                  >
                    <Text style={styles.leaveReview}>
                      {" "}
                      Remove from liked reviews{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        />
      </View>
    );
  }
}

class CostumImg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
    };
  }

  imgError = () => {
    this.setState({ display: false });
  };

  render() {
    return (
      <>
        {this.state.display ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 16,
            }}
          >
            <Image
              source={{
                uri:
                  "http://10.0.2.2:3333/api/1.0.0/location/" +
                  this.props.item.location.location_id +
                  "/review/" +
                  this.props.item.review.review_id +
                  "/photo?t=" +
                  Date.now(),
              }}
              style={styles.tinyLogo}
              onError={this.imgError}
            />
          </View>
        ) : (
          <View></View>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F6F7EB",
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
    fontWeight: "bold",
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
    alignItems: "center",
    flexDirection: "row",
  },
  notfound: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#EEEEEE",
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#EEEEEE",
    borderRadius: 6,
    backgroundColor: "#EEEEEE",
    fontSize: 16,
    fontWeight: "bold",
  },
  leaveReview: {
    flexDirection: "row",
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#F6F7EB",
    borderRadius: 6,
    backgroundColor: "#5C415D",
    color: "#F6F7EB",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
});

export default coffeeLikes;
