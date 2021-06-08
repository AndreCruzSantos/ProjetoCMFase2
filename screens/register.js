import React from "react";

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';

export default class Register extends React.Component {
    render(){
      return (
          <View style={styles.background}>
        <Image source={require("../images/AgendYourself_Logo.png")} style={styles.logo}></Image>
        <View style={styles.inputView}>
          <Image source={require("../images/baseline_person_black_24dp.png")} style={styles.image}></Image>
          <TextInput style = {styles.input} placeholder="Nome de Utilizador"></TextInput>
        </View>
        <View style={styles.inputView}>
          <Image source={require("../images/baseline_email_black_24dp.png")} style={styles.image}></Image>
          <TextInput style = {styles.input} placeholder="Email"></TextInput>
        </View>
        <View style={styles.inputView}>
          <Image source={require("../images/baseline_lock_black_24dp.png")} style={styles.image}></Image>
          <TextInput style = {styles.input} placeholder="Password"></TextInput>
        </View>
        <View style={styles.inputView}>
          <Image source={require("../images/baseline_lock_black_24dp.png")} style={styles.image}></Image>
          <TextInput style = {styles.input} placeholder="Repetir Password"></TextInput>
        </View>
        <TouchableOpacity style={styles.signInBtn}>
          <Text style={styles.signInText}>
            Registe-se
          </Text>
        </TouchableOpacity><TouchableOpacity style={styles.registerBtn}>
          <Text style={styles.registerTxt}>
          Já tem conta?
          </Text>
        </TouchableOpacity>
      </View>
    );
    }
}

const styles = StyleSheet.create({
  background:{
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
  image:{
    width:25,
    height:25,
    marginTop: 12,
    marginLeft: 10
  },
  input:{
    flex:1,
    paddingLeft: 7,
    fontSize: 16
  },
  signInBtn:{
    width: '70%',
    height: 40,
    borderWidth: 1.5,
    backgroundColor: '#FF8000',
    marginTop: 23,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signInText:{
    fontSize: 17,
    fontWeight: 'bold',
    color: 'black'
  },
  forgotPasswordTxt:{
    fontSize:13,
    marginTop: 13,
    marginRight: '15%',
    color: 'white'
  },
  registerBtn:{
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
  logo:{
    width:230,
    height:230
  },
  registerTxt:{
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold'
  }
});