import React from "react";

import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

export default class UserProfile extends React.Component{
    render(){
        return (
                <View>
                    <ScrollView showsHorizontalScrollIndicator={false}>
                        <View style={styles.background}>
                            <TouchableOpacity>
                                <Image source={require('../images/back.png')} style={styles.back}></Image> {/* se não funcionar é pq não tinha a certeza de como tinham dado o nome a cena de voltar atras e nao sei dar pull XD */}
                                <View></View>
                                <View></View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.view1}>
                            <Image source={require('../images/foto.png')} style={styles.profileImage}></Image>
                            <Text style={styles.text1}>Diogo Rodrigues</Text>
                            <Text style={styles.text2}>diogorodriguesfcp99@gmail.com</Text>
                        </View>
                        <View style={styles.resetView}>
                            <Text style={styles.resetText}>Reset Password</Text>
                        </View>
                        <View style={styles.deleteView}>
                            <Text style={styles.deleteText}>Delete Account</Text>
                        </View>
                        <View style={styles.logoutView}>
                        <Text style={styles.logoutText}>Logout</Text>
                        </View>
                    </ScrollView>
                </View>
        );
    }
};

const styles = StyleSheet.create({
    background: {
        padding: 10,
        width: '100',
        backgroundColor: '#000',
        height: 150
    },
    back: {
        width: 30,
        height: 30
    },
    view1: {
        alignItems: 'center'
    },
    text1: {
        fontSize: 25,
        fontWeight: 'bold',
        padding: 10
    },
    text2: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'grey'
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
        width: '90%',
        padding: 20,
        paddingBottom: 22,
        borderRadius: 10,
        shadowOpacity: 80,
        elevation: 15,
        marginTop: 20
    },
    resetText: {
        fontSize: 15,
        color: '#818181',
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
        backgroundColor: '#CE2525',
        width: '90%',
        padding: 20,
        paddingBottom: 22,
        borderRadius: 10,
        shadowOpacity: 80,
        elevation: 15,
        marginTop: 20,
    },
    logoutView: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#000',
        width: '90%',
        padding: 20,
        paddingBottom: 22,
        borderRadius: 10,
        shadowOpacity: 80,
        elevation: 15,
        marginTop: 20,
        marginBottom: 40
    },
    logoutText: {
        fontSize: 15,
        color: '#fff',
        fontWeight: 'bold'
    }
});