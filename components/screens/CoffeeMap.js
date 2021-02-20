import React, { Component } from 'react';
import { Text, TextInput, View, Button, StyleSheet, Alert, TouchableOpacity, PermissionsAndroid  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from 'react-native-geolocation-service';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

async function requestLocationPermission(){
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Lab04 Location Permission',
        message:
          'This app requires access to your location.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can access location');
      return true;
    } else {
      console.log('Location permission denied');
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
}


export default class geoloc extends Component {
  constructor(props){
    super(props);
    this.state = {
      location:null,
      locationPermission: false,
      latlng: {
        latitude:53.4808,
        longitude:-2.2426
      },
      mapOk: false,

    }
  }



  findCoordinates = () => {
    if(!this.state.locationPermission){
      this.state.locationPermission = requestLocationPermission();
    }

    Geolocation.getCurrentPosition(
      (position) => {
        const location = JSON.stringify(position);

        this.setState({ location });
      },
      (error) => {
        Alert.alert(error.message)
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  };


  mapIsReady = () => {
    this.setState({ mapOk:true });
  }



  render() {
    return (
          <MapView
            provder={PROVIDER_GOOGLE}
            ref={(el) => { this.map = el }}
            style={styles.container}
            zoomControl= {true}
            mapTypeControl={true}
            scaleControl= {true}
            streetViewControl={true}
            rotateControl={true}
            fullscreenControl= {true}
            region={{
              latitude: this.state.latlng.latitude,
              longitude: this.state.latlng.longitude,
              latitudeDelta: 0.002,
              longitudeDelta: 0.002,
            }}
          >
          <Marker
            coordinate={this.state.latlng}
            title="My location"
            description="Here I Am"
            />
            </MapView>
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
 }
});
