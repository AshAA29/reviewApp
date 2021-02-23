import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

class coffeeLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleInputEmail = (email) => {
    this.setState({ email: email });
  };

  handleInputPassword = (password) => {
    this.setState({ password: password });
  };

  login = async () => {
    let loginDetails = {};

    if (this.state.email.indexOf("@") === -1) {
      Alert.alert("Invalid Email Format");
    } else {
      loginDetails["email"] = this.state.email;
      loginDetails["password"] = this.state.password;

      return fetch("http://10.0.2.2:3333/api/1.0.0/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginDetails),
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else if (response.status === 400) {
            this.props.navigation.replace("CoffeeLogin");
          } else {
            throw "Something doesnt seem right";
          }
        })
        .then(async (responseJson) => {
          await AsyncStorage.setItem("@session_token", responseJson.token);
          await AsyncStorage.setItem("@user_id", responseJson.id.toString());
          this.setState({ email: "" });
          this.setState({ password: "" });
          this.props.navigation.navigate("CoffeeNav");
        })

        .catch((error) => {
          Alert.alert("Invalid username or password entered");
        });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.items}
          placeholder="Enter Email..."
          onChangeText={this.handleInputEmail}
          value={this.state.email}
        />
        <TextInput
          style={styles.items}
          secureTextEntry={true}
          placeholder="Enter Password..."
          onChangeText={this.handleInputPassword}
          value={this.state.password}
        />
        <TouchableOpacity onPress={this.login}>
          <Text style={styles.btn}> Login </Text>
        </TouchableOpacity>
        <Text> </Text>
        <Text> Dont have an account? </Text>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("CoffeeSignUp")}
        >
          <Text style={styles.btn}> Sign Up </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#F6F7EB",
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
});

export default coffeeLogin;
