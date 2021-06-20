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

export default class ChangePassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password : ''
        }
    }

    resetPassword = (password) => {
        auth().currentUser.updatePassword(password).then(() => {
            alert('Password alterada!');
            this.props.navigation.navigate('ProfilePage');
        })
    }

    render() {
        const {email} = this.state;
        return (
            <View style={styles.background}>
                <Image source={require("../images/AgendYourself_Logo.png")} style={styles.logo}></Image>
                <View style={styles.inputView}>
                    <Image source={require("../images/lock.png")} style={styles.image}></Image>
                    <TextInput style={styles.input} placeholder='Insira a nova Password' onChangeText={(newPassword) => {this.setState((prevState) => ({password : newPassword}))}}></TextInput>
                </View>
                <TouchableOpacity style={styles.newPassword} onPress={() => this.resetPassword(this.state.password)}>
                    <Text style={styles.text}>
                        Nova Password!
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
      width: 230,
      height: 230
    },
    newPassword: {
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
    }
});