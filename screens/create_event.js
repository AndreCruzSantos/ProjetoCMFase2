import React, { Component, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  Animated,
  Switch,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';

import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from 'moment';
import MomentPT from 'moment/src/locale/pt';

import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';



class FloatingLabelInput extends Component {
  state = {
    isFocused: false,
  }


  UNSAFE_componentWillMount() {
    this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
  }

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: (this.state.isFocused ? 1 : 0 || this.props.value !== '') ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }

  render() {

    const { label, ...props } = this.props;
    const { isFocused } = this.state;
    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 0],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 14],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#000', '#000'],
      }),
    };
    return (
      <View style={{ paddingTop: 18 }}>
        <Animated.Text style={labelStyle}>
          {label}
        </Animated.Text>
        <TextInput
          {...props}
          style={{ height: 39, fontSize: 15, color: '#000', borderBottomWidth: 1, borderBottomColor: '#555' }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit
        />


      </View>
    );
  }
}

var styles = {

  switchView: {
    marginLeft: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  dataView: {
    marginLeft: '6%',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
}

export default class CreateEvent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      description: '',
      location: '',
      isEnabled: false,
      startDate: new Date(),
      isVisible: false,
      endDate: new Date(),
      isEndVisible: false,
      calendarKey: props.route.params.calendarKey,
      username: '',
    };

  }

  componentDidMount(){
    this.getAuthUsername();
  }

  getAuthUsername = () => {
    firebase.database().ref().child('users').orderByChild('email').equalTo(firebase.auth().currentUser.email).once('value').then(snapshot => {
        if (snapshot.exists()) {
            snapshot.forEach((snap) => {
                this.setState({
                    username: snap.key
                });
            });
        }
    });
}


  createEvent = (title, desc, locat, sDate, eDate) => {
    if (title.length != 0 && desc.length != 0 && locat.length != 0) {
      firebase.database().ref().child('users').child(this.state.username).child('calendars').child(this.state.calendarKey).child('events').push().set({
        "title": title, "description": desc, "location": locat,
        "startDate": sDate, "endDate": eDate
      });
      this.props.navigation.reset({index:0, routes:[{name: 'CalendárioTeste', params: {calendarKey: this.state.calendarKey}}]});
      //this.props.navigation.navigate('CalendárioTeste', {calendarKey: this.state.calendarKey});
    } else {
      Alert.alert('Todos os campos têm de estar preenchidos.');
    }
  }


  handlePicker = (datetime) => {
    this.setState({
      isVisible: false,
      startDate: datetime
    })
  }

  handleEndPicker = (datetime) => {
    this.setState({
      isEndVisible: false,
      endDate: datetime
    })
  }

  render() {
    const { value, description, location, isEnabled, startDate, isVisible, endDate, isEndVisible } = this.state;
    return (
      <View>

        <View style={{ margin: 20 }}>

          <FloatingLabelInput
            label="Título"
            value={value}
            onChangeText={(title) => { this.setState((prevState) => ({ value: title })) }}

          />


          <FloatingLabelInput
            label="Descrição"
            value={description}
            onChangeText={(desc) => { this.setState((prevState) => ({ description: desc })) }}
          />

          <FloatingLabelInput
            label="Localização"
            value={location}
            onChangeText={(loc) => { this.setState((prevState) => ({ location: loc })) }}
          />

        </View>


        <View style={styles.switchView}>
          <Text style={{ color: "#000", fontSize: 20 }}>
            O dia todo
                    </Text>
          <Switch style={{ marginEnd: '4%' }}
            trackColor={{ true: 'green', false: 'grey' }}
            onValueChange={(value) => this.setState({ isEnabled: value })}
            value={isEnabled}
          >
          </Switch>
        </View>


        <View style={{ marginTop: 20 }}>
          <TouchableOpacity style={styles.dataView}
            onPress={() => this.setState({ isVisible: !this.state.isVisible })}
          >

            <Text style={{ color: "#000", fontSize: 20 }}>Início </Text>
            {isEnabled ?
              <View>
                <Text style={{ color: "#000", fontSize: 15, marginEnd: '4%' }}> {Moment(startDate).format('DD ' + '' + 'MMMM')}</Text>
                <DateTimePicker
                  isVisible={isVisible}
                  mode="date"
                  display="spinner"
                  onConfirm={this.handlePicker}
                  onCancel={() => this.setState({ isVisible: false })}
                />
              </View>
              :
              <View>
                <Text style={{ color: "#000", fontSize: 15, marginEnd: '4%' }}> {Moment(startDate).format('DD ' + '' + 'MMMM' + ', ' + 'HH:mm')}</Text>
                <DateTimePicker
                  isVisible={isVisible}
                  mode="datetime"
                  display="spinner"
                  onConfirm={this.handlePicker}
                  onCancel={() => this.setState({ isVisible: false })}
                />
              </View>
            }

          </TouchableOpacity>

        </View>

        <View style={{ marginTop: 20 }}>
          <TouchableOpacity style={styles.dataView}
            onPress={() => this.setState({ isEndVisible: !this.state.isEndVisible })}
          >
            <Text style={{ color: "#000", fontSize: 20 }}>Fim </Text>
            {isEnabled ?
              <View>
                <Text style={{ color: "#000", fontSize: 15, marginEnd: '4%' }}> {Moment(endDate).format('DD ' + '' + 'MMMM')}</Text>
                <DateTimePicker
                  isVisible={isEndVisible}
                  mode="date"
                  display="spinner"
                  onConfirm={this.handleEndPicker}
                  onCancel={() => this.setState({ isEndVisible: false })}
                />
              </View>
              :
              <View>
                <Text style={{ color: "#000", fontSize: 15, marginEnd: '4%' }}> {Moment(endDate).format('DD ' + '' + 'MMMM' + ', ' + 'HH:mm')}</Text>
                <DateTimePicker
                  isVisible={isEndVisible}
                  mode="datetime"
                  display="spinner"
                  onConfirm={this.handleEndPicker}
                  onCancel={() => this.setState({ isEndVisible: false })}
                />
              </View>
            }

          </TouchableOpacity>



        </View>
        <TouchableOpacity style={styles.dataView}
          onPress={() => this.createEvent(value, description, location, Moment(startDate).format('YYYY-MM-DD'), endDate.toString())}>
          <Text>Ola</Text>
        </TouchableOpacity>
      </View>

    );
  }
}

