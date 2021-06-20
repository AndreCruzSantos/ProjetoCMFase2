import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

var firebaseConfig = {
  apiKey: "AIzaSyAxdWpiRdhn2B_INeYWAqaS0K9awbJMyOM",
  authDomain: "agendyourselfbd.firebaseapp.com",
  databaseURL: 'https://agendyourselfbd-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: "agendyourselfbd",
  storageBucket: "agendyourselfbd.appspot.com",
  messagingSenderId: "303668905085",
  appId: "1:303668905085:android:ed94470101e9de2ad29d14",
  measurementId: "G-0V1ZQ3V6YD"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default class Register extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      repPassword: '',
      isChecked1 : false,
      isChecked2 : false
    };
  }

  register = (name, mail, pass, repPass) => {
    if (name.length != 0 && mail.length != 0 && pass.length != 0 && repPass.length != 0) {
      if (pass == repPass) {
        firebase.database().ref().child('users').orderByChild('username').equalTo(name).once('value').then(snapshot =>{
          if(!snapshot.exists()){
            firebase.auth().createUserWithEmailAndPassword(mail, pass).then(() => {
              firebase.database().ref().child('users').child(name).set({'username': name, 'email': mail});
              this.props.navigation.navigate('LoginPage');
            });
          }else{
            Alert.alert("Já existe uma conta associada ao email e/ou nome introduzido(s)");
          }
        });
      }
      else{
        Alert.alert("As password não coincidem.");
      }
    }
    else{
      Alert.alert("Preencha todos os campos.");
    }
  }

  setIsChecked1 = () => {
    this.setState({isChecked1 : !this.state.isChecked1});
  }
  setIsChecked2 = () => {
    this.setState({isChecked2 : !this.state.isChecked2});
  }

  render() {
    const { username, email, password, repPassword, isChecked1, isChecked2 } = this.state;
    return (
      <View style={styles.background}>
        <Image source={require("../images/AgendYourself_Logo.png")} style={styles.logo}></Image>
        <View style={styles.inputView}>
          <Image source={require("../images/profile.png")} style={styles.image}></Image>
          <TextInput style={styles.input} placeholder="Nome de Utilizador"
            onChangeText={(name) => { this.setState((prevState) => ({ username: name })) }}></TextInput>
        </View>
        <View style={styles.inputView}>
          <Image source={require("../images/email.png")} style={styles.image}></Image>
          <TextInput style={styles.input} placeholder="Email"
            onChangeText={(mail) => { this.setState((prevState) => ({ email: mail })) }}></TextInput>
        </View>
        <View style={styles.inputView}>
        <Image source={require("../images/lock.png")} style={styles.image}></Image>
          <TextInput style={styles.input} placeholder="Password" secureTextEntry={!isChecked1} onChangeText={(pass) => {this.setState((prevState) => ({password : pass}))}}></TextInput>
          {isChecked1 ? <TouchableOpacity onPress={this.setIsChecked1}><Image style={styles.visibilityImage} source={require('../images/visibility.png')}></Image></TouchableOpacity> : <TouchableOpacity onPress={this.setIsChecked1}><Image style={styles.visibilityImage} source={require('../images/visibility_off.png')}></Image></TouchableOpacity>}
        </View>
        <View style={styles.inputView}>
        <Image source={require("../images/lock.png")} style={styles.image}></Image>
          <TextInput style={styles.input} placeholder="Repetir Password" secureTextEntry={!isChecked2} onChangeText={(repPass) => {this.setState((prevState) => ({repPassword : repPass}))}}></TextInput>
          {isChecked2 ? <TouchableOpacity onPress={this.setIsChecked2}><Image style={styles.visibilityImage} source={require('../images/visibility.png')}></Image></TouchableOpacity> : <TouchableOpacity onPress={this.setIsChecked2}><Image style={styles.visibilityImage} source={require('../images/visibility_off.png')}></Image></TouchableOpacity>}
        </View>
        <TouchableOpacity style={styles.signInBtn} onPress={() => this.register(username, email, password, repPassword)}>
          <Text style={styles.signInText}>
            Registe-se
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerBtn} onPress={() => this.props.navigation.navigate('LoginPage')}>
          <Text style={styles.registerTxt}>
            Já tem conta? Inicie sessão
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#2B2A2A',
    alignItems: 'center',
  },
  inputView: {
    flexDirection: 'row',
    width: '70%',
    marginTop: 10,
    backgroundColor: 'white',
    borderRadius: 25,
  },
  image: {
    width: 25,
    height: 25,
    marginTop: 12,
    marginLeft: 10
  },
  input: {
    flex: 1,
    paddingLeft: 7,
    fontSize: 16
  },
  signInBtn: {
    width: '70%',
    height: 40,
    borderWidth: 1.5,
    backgroundColor: '#FF8000',
    marginTop: 23,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signInText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black'
  },
  forgotPasswordTxt: {
    fontSize: 13,
    marginTop: 13,
    marginRight: '15%',
    color: 'white'
  },
  registerBtn: {
    width: '70%',
    height: 40,
    borderWidth: 1.5,
    borderColor: '#FF8000',
    backgroundColor: '#2B2A2A',
    marginTop: 23,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    marginTop: 50,
    width: 230,
    height: 230
  },
  registerTxt: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold'
  },
  
  visibilityImage: {
    marginRight: 12,
    marginTop: 12
  }
});