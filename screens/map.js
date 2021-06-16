
import React from 'react';
import { View, Image, Text, Button, ScrollView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import prompt from 'react-native-prompt-android';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import Geolocation from "react-native-geolocation-service";


export default class MapScreen extends React.Component {
    constructor(props) {
        super(props);
         this.state = {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0121
         };
       }

      componentDidMount() {
        Geolocation.getCurrentPosition(position => {
            this.setState({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0121
            });
          },
          error => {
            Alert.alert(error.message.toString());
          },
          {
            showLocationDialog: true,
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 0
          }
        );
      }
    render() {

        return (
            <View style={styles.container}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    mapType={"hybrid"}
                    showsUserLocation={true}
                    region={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: this.state.latitudeDelta,
                        longitudeDelta: this.state.longitudeDelta
                    }}>
                        <MapView.Marker 
                            draggable
                            coordinate={{
                                latitude: this.state.latitude,
                                longitude: this.state.longitude,
                            }}
                            pinColor = {"darkorange"}     
                            title={"My Location"}
                            description={"User's current location"}
                            />
                </MapView>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      flex: 1,
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
   });
