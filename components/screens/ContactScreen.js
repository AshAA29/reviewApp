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

class ContactScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate("About")}
        >
          <Text style={styles.fields}> About Us </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
          <Text style={styles.fields}> Go back </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F6F7EB",
  },
  fields: {
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

export default ContactScreen;
