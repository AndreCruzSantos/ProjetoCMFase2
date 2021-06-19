import React from "react";

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
    ScrollView,
} from 'react-native';

const styles = StyleSheet.create({
    background: {
        flex: 1,
        padding: 10,
        backgroundColor: '#2B2A2A',
    },
    emailView:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    back: {
        width: 30,
        height: 30
    },
    view1: {
        alignItems: 'center',
        marginTop: -40
    },
    emailText : {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        color: '#FF8000',
        fontSize: 20
    },
    text1: {
        fontSize: 30,
        fontWeight: 'bold',
        padding: 10,
        color: '#ffffff'
    },
    text2: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#ffffff',
        marginLeft: 10
    },
    profileImage: {
        width: 140,
        height: 140,
        borderRadius: 100,
        marginTop: 70
    },
    resetView: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#fff',
        width: '50%',
        padding: 15,
        borderRadius: 10,
        shadowOpacity: 80,
        elevation: 15,
        marginTop: 50
    },
    resetText: {
        fontSize: 15,
        color: '#FF8000',
        fontWeight: 'bold'
    },
    deleteText: {
        fontSize: 15,
        color: '#fff',
        fontWeight: 'bold'
    },
    deleteView: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#ff0000',
        width: '50%',
        padding: 15,
        borderRadius: 10,
        shadowOpacity: 80,
        elevation: 15,
        marginTop: 40,
    },
    logoutView: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        width: '50%',
        padding: 15,
        borderRadius: 10,
        shadowOpacity: 80,
        elevation: 15,
        marginTop: 40
    },
    logoutText: {
        fontSize: 15,
        color: '#ff0000',
        fontWeight: 'bold'
    }
});

export default class UserProfile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username : '',
            email: firebase.auth().currentUser.email
        };
    }

    getAuthUsername = () => {
        firebase.database().ref().child('users').orderByChild('email').equalTo(firebase.auth().currentUser.email).once('value').then(snapshot => {
            if(snapshot.exists()){
                snapshot.forEach((snap) => {
                    this.setState({
                        username : snap.key
                    });
                });
            }
        });
    }

    componentDidMount(){
        this.getAuthUsername();
    }

    render(){
        console.log(firebase.apps);
        return (
            <View style={styles.background}>
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <View style={styles.view1}>
                        <Image source={require('../images/profile_image.png')} style={styles.profileImage}></Image>
                        <Text style={styles.text1}>{this.state.username}</Text>
                    </View>
                    <View style={styles.emailView}>
                        <Text style={styles.emailText}>
                            Email:
                        </Text>
                        <Text style={styles.text2}>
                            {this.state.email}
                        </Text>
                    </View>
                    <View style={styles.emailView}>
                        <Text style={styles.emailText}>
                            Password:
                        </Text>
                        <Text style={styles.text2}>
                            *********
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.resetView}>
                        <Text style={styles.resetText}>Reset Password</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.deleteView}>
                        <Text style={styles.deleteText}>Delete Account</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutView}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
};

