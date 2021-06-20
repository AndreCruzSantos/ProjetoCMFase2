
import React from 'react';
import { View, Image, Text, Button, ScrollView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import prompt from 'react-native-prompt-android';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from 'react-native-maps';
import Geolocation from "react-native-geolocation-service";
import { NavigationContainer } from '@react-navigation/native';


export default class SelectMap extends React.Component {
    constructor(props) {
        super(props);
         this.state = {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0121,
            marker: null
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
            if (this.map) {
              this.map.animateToRegion({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0121
              })
            }
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
                  initialRegion={{
                    latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    latitudeDelta: this.state.latitudeDelta,
                    longitudeDelta: this.state.longitudeDelta
                  }}
                  region={{latitude: this.state.latitude,
                    longitude: this.state.longitude,
                    latitudeDelta: this.state.latitudeDelta,
                    longitudeDelta: this.state.longitudeDelta}}
                  provider={PROVIDER_GOOGLE}
                  style={styles.map}
                  mapType={"hybrid"}
                  showsUserLocation={true}
                    
                  onPress={(e) => this.setState({ 
                    latitude: e.nativeEvent.coordinate.latitude,
                    longitude: e.nativeEvent.coordinate.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0121,
                    marker: e.nativeEvent.coordinate })}>
                  {this.state.marker && <MapView.Marker coordinate={this.state.marker} pinColor={'darkorange'} /> }
                </MapView>
                <View style={styles.btnContainer}>
                  {this.state.marker != null ? 
                    <Button 
                      title="Selecionar Localização" 
                      color="#FF8000"
                      onPress={() => this.props.navigation.navigate('CreateEventPage', {lat: this.state.latitude, long: this.state.longitude})}
                    ></Button>
                    : null 
                  }
                </View>
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
    btnContainer: {
      position: 'absolute',
      bottom: 0,
      marginBottom: 75,
      alignSelf: 'center'
    }
   });
