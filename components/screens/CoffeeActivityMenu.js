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
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";
import StarRating from "react-native-star-rating";

class coffeeActivityMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.stars}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("CoffeeFavourites")}
          >
            <Ionicons name="ios-heart" size={120} color="#5C415D" />
          </TouchableOpacity>
          <Text style={{ fontSize: 25 }}>See favourite Places</Text>
        </View>

        <View style={styles.stars}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("CoffeeLikes")}
          >
            <Ionicons name="ios-thumbs-up" size={120} color="#5C415D" />
          </TouchableOpacity>
          <Text style={{ fontSize: 25 }}>See Liked Reviews</Text>
        </View>

        <View style={styles.stars}>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("CoffeeMyReviews")}
          >
            <Ionicons name="ios-pencil-sharp" size={120} color="#5C415D" />
          </TouchableOpacity>
          <Text style={{ fontSize: 25 }}>See My Reviews</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F6F7EB",
    justifyContent: "space-around",
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
    flexDirection: "column",
    alignSelf: "center",
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
});

export default coffeeActivityMenu;
