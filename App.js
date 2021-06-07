/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Image,
  Button,
  TouchableOpacity
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({children, title}): Node => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

function SignInScreen(){
  return(
    <View style={styles.background}>
      <View style={styles.inputView}>
        <Image source={require("./images/baseline_email_black_24dp.png")} style={styles.image}></Image>
        <TextInput style = {styles.input} placeholder="Email"></TextInput>
      </View>
      <View style={styles.inputView}>
        <Image source={require("./images/baseline_lock_black_24dp.png")} style={styles.image}></Image>
        <TextInput style = {styles.input} placeholder="Password" secureTextEntry={true}></TextInput>
      </View>
      <Text style={styles.forgotPasswordTxt}>
        Esqueceu-se da palavra-passe?
      </Text>
      <TouchableOpacity style={styles.signInBtn}>
        <Text style={styles.signInText}>
          Iniciar Sessão
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerBtn}>
        <Text style={styles.signInText}>
          Registar
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function SignUpScreen(){
  return(
    <View style={styles.background}>
      <View style={styles.inputView}>
        <Image source={require("./images/baseline_person_black_24dp.png")} style={styles.image}></Image>
        <TextInput style = {styles.input} placeholder="Nome de Utilizador"></TextInput>
      </View>
      <View style={styles.inputView}>
        <Image source={require("./images/baseline_email_black_24dp.png")} style={styles.image}></Image>
        <TextInput style = {styles.input} placeholder="Email"></TextInput>
      </View>
      <View style={styles.inputView}>
        <Image source={require("./images/baseline_lock_black_24dp.png")} style={styles.image}></Image>
        <TextInput style = {styles.input} placeholder="Password"></TextInput>
      </View>
      <View style={styles.inputView}>
        <Image source={require("./images/baseline_lock_black_24dp.png")} style={styles.image}></Image>
        <TextInput style = {styles.input} placeholder="Repetir Password"></TextInput>
      </View>
      <TouchableOpacity style={styles.signInBtn}>
        <Text style={styles.signInText}>
          Registe-se
        </Text>
      </TouchableOpacity><TouchableOpacity style={styles.registerBtn}>
        <Text style={styles.signInText}>
         Já tem conta?
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const App: () => Node = () => {
  return (
    SignInScreen()
  );
};

const styles = StyleSheet.create({
  background:{
    flex: 1,
    backgroundColor: '#C0C0C0',
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
    borderColor: '#009900',
    backgroundColor: '#00CC66',
    marginTop: 23,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  signInText:{
    fontSize: 17,
    fontWeight: 'bold',
  },
  forgotPasswordTxt:{
    fontSize:13,
    marginTop: 13,
    marginRight: '15%'
  },
  registerBtn:{
    width: '70%',
    height: 40,
    borderWidth: 1.5,
    borderColor: '#009900',
    backgroundColor: '#C0C0C0',
    marginTop: 23,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default App;
