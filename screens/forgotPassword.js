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

export default class ForgotPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email : ''
        }
    }

    forgotPassword = (email) => {
        auth().sendPasswordResetEmail(email).then(() => {
            alert('Por favor verifique o seu email!');
            this.props.navigation.navigate('LoginPage');
        })
    }

    render() {
        const {email} = this.state;
        return (
            <View style={styles.background}>
                <Image source={require("../images/AgendYourself_Logo.png")} style={styles.logo}></Image>
                <View style={styles.inputView}>
                    <Image source={require("../images/email.png")} style={styles.image}></Image>
                    <TextInput style={styles.input} placeholder='Insira o seu email' onChangeText={(mail) => {this.setState((prevState) => ({email : mail}))}}></TextInput>
                </View>
                <TouchableOpacity style={styles.recoverPassword} onPress={() => this.forgotPassword(email)}>
                    <Text style={styles.text}>
                        Enviar email
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.loginBtn} onPress={() => this.props.navigation.navigate('LoginPage')}>
                    <Text style={styles.loginTxt}>
                        Inicie sessão
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
        alignItems: 'center'
    },
    inputView: {
        flexDirection: 'row',
        width: '70%',
        marginTop: 30,
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
      fontSize: 16,
    },
    logo: {
      marginTop: 100,
      width: 230,
      height: 230
    },
    recoverPassword: {
      width: '70%',
      height: 43,
      borderWidth: 1.5,
      backgroundColor: '#FF8000',
      marginTop: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center'
    },
    text: {
      fontSize: 17,
      fontWeight: 'bold',
      color: 'black'
    },
    loginBtn: {
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
      loginTxt: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold'
      },
});