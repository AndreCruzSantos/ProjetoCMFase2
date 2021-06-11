import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  signIn = (email,password) => {
    auth().signInWithEmailAndPassword(email,password).then(() => {
      console.log('User account created & signed in!');
      this.props.navigation.navigate('Calendário');
    })
    .catch(error => {
      if (error.code === 'auth/email-already-in-use') {
        console.log('That email address is already in use!');
      }
  
      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
      console.error(error);
    });
  }

  goToRegister = () => {
    this.props.navigation.navigate('Register');
  }

  goToForgotPassword = () => {
    this.props.navigation.navigate('ForgotPassword');
  }

  render() {
    const {email,password} = this.state;

    return (
      <View style={styles.background}>
        <Image source={require("../images/AgendYourself_Logo.png")} style={styles.logo}></Image>
        <View style={styles.inputView}>
          <Image source={require("../images/baseline_email_black_24dp.png")} style={styles.image}></Image>
          <TextInput style={styles.input} placeholder="Email" onChangeText={(mail) => {this.setState((prevState) => ({email : mail}))}}></TextInput>
        </View>
        <View style={styles.inputView}>
          <Image source={require("../images/baseline_lock_black_24dp.png")} style={styles.image}></Image>
          <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} onChangeText={(pass) => {this.setState((prevState) => ({password : pass}))}}></TextInput>
        </View>
        <Text style={styles.forgotPasswordTxt} onPress={this.goToForgotPassword}>
          Esqueceu-se da palavra-passe?
        </Text>
        <TouchableOpacity onPress={() => this.signIn(email,password)} style={styles.signInBtn}>
          <Text style={styles.signInText}>
            Iniciar Sessão
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerBtn} onPress={this.goToRegister}>
          <Text style={styles.registerTxt}>
            Registar
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
    width: 230,
    height: 230
  },
  registerTxt: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold'
  }
});