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

class coffeeprofile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      profileData: [],
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
          profileData: responseJson,
        });
      })
      .catch((error) => {
        console.log(error);
      });
    fg;
  };

  componentDidMount() {
    if ((isLoading = true)) {
      this.getData();
    }
  }

  logout = async () => {
    var token = await AsyncStorage.getItem("@session_token");
    var userID = await AsyncStorage.getItem("@user_id");
    return fetch("http://10.0.2.2:3333/api/1.0.0/user/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Authorization": token },
    })
      .then((response) => {
        if (response.status === 200) {
          this.props.navigation.navigate("CoffeeLogin", {
            screen: "CoffeeInitialNav",
          });
        } else if (response.status === 401) {
          throw "Unauthorised";
        } else {
          throw "Server Error";
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View style={styles.icon}>
          <Ionicons name="ios-person-circle-outline" size={150} />
        </View>
        <View>
          <Text style={styles.items}>
            First name: {this.state.profileData.first_name}
          </Text>
          <Text style={styles.items}>
            Last name: {this.state.profileData.last_name}
          </Text>
          <Text style={styles.items}>
            Email: {this.state.profileData.email}
          </Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.replace("EditProfile")}
          >
            <Text style={styles.leaveReview}> Edit Profile </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.logout()}>
            <Text style={styles.leaveReview}> Logout </Text>
          </TouchableOpacity>
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
    justifyContent: "center",
  },
  icon: {
    alignItems: "center",
    textAlign: "center",
    backgroundColor: "#EEEEEE",
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
    fontWeight: "bold",
  },
  items: {
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: "#EEEEEE",
    backgroundColor: "#EEEEEE",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  leaveReview: {
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

export default coffeeprofile;
