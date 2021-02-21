import { RNCamera } from "react-native-camera";
import React, { Component } from "react";
import {
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  PermissionsAndroid,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Ionicons from "react-native-vector-icons/Ionicons";

export default class coffeCam extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  postPic = async (data) => {
    var token = await AsyncStorage.getItem("@session_token");
    const { revID, locID } = this.props.route.params;
    return fetch(
      "http://10.0.2.2:3333/api/1.0.0/location/" +
        locID +
        "/review/" +
        revID +
        "/photo",
      {
        method: "POST",
        headers: { "Content-Type": "image/jpeg", "X-Authorization": token },
        body: data,
      }
    )
      .then((response) => {
        if (response.status === 404) {
          throw "Not Found";
        }
        if (response.status === 400) {
          Alert.alert("Bad request");
        } else if (response.status === 200) {
          Alert.alert("Photo Added");
          this.props.navigation.replace("CoffeeMyReviews");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { revID, locID } = this.props.route.params;
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
        />

        <View>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.btn}
          >
            <Ionicons name="ios-camera-outline" size={50} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      this.postPic(data);
    }
  };
}

const styles = StyleSheet.create({
  container: { flex: 1, flexDirection: "column", backgroundColor: "#F6F7EB" },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    borderRadius: 0,
  },
  capture: {
    flex: 0,
    flexDirection: "row",
    borderRadius: 0,
    padding: 0,
    paddingHorizontal: 0,
    alignSelf: "center",
    margin: 20,
  },
  btn: {
    borderColor: "#F6F7EB",
    backgroundColor: "#5C415D",
    color: "#F6F7EB",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
  },
});
