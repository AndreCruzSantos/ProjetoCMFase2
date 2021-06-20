import React, { Component, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';

import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from 'moment';
import database from '@react-native-firebase/database'
import firebase from '@react-native-firebase/app';

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



const styles = {
    icons: {
        resizeMode: 'contain',
        flexDirection: 'row'
    },
    dataView: {
        marginTop: '6%',
        marginLeft: '6%',
        marginRight: '4%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    titleText: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: '10%',
        marginLeft: '5.6%',
        color: '#fff'
    },
    normalText: {
        fontSize: 15,
        marginLeft: '6%',
        marginTop: '1%',
        color: '#fff'
    },
    add: {
        marginLeft: '6%',
        marginTop: '1%',
        color: "#2073f7"
    },
}


export default class EventPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            eventKey: props.route.params.eventKey,
            notificationTime: new Date('June 25, 2021 12:00'),
            isVisible: false,
            startTime: '',
            endTime: '',
            description: '',
            title: '',
            username: '',
            calendarKey: props.route.params.calendarKey,
            calendarType: props.route.params.calendarType,
        }

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
            this.loadEventInfo();
        });
    }

    loadEventInfo = () => {
        firebase.database().ref().child('users').child(this.state.username).child(this.state.calendarType).child(this.state.calendarKey).child('events').child(this.state.eventKey).once('value', snapshot => {
            this.setState({
                startTime: Moment(snapshot.val().startDate).format('HH:mm'),
                endTime: snapshot.val().endDate,
                description: snapshot.val().description, 
            });
        });
    }

    componentDidMount() {
        this.getAuthUsername();
    }

    handlePicker = (datetime) => {
        this.setState({
            isVisible: false,
            notificationTime: datetime
        });
    }

    removeEvent = () => {
        firebase.database().ref().child('users').child(this.state.username).child(this.state.calendarType).child(this.state.calendarKey).child('events').child(this.state.eventKey).remove()
        .then(this.removeSharedEvent)
        .then(this.props.navigation.reset({index:0, routes:[{name: 'CalendárioTeste', params: {calendarKey: this.state.calendarKey, calendarType: this.state.calendarType}}]}));
    }

    removeSharedEvent = () => {
        if(this.state.calendarType == 'calendars'){
            firebase.database().ref().child('users').once('value', snapshot =>{
              snapshot.forEach(snap => {
                if(snap.key != this.state.username){
                  if(typeof snap.val().shareCalendars !== 'undefined'){
                      firebase.database().ref().child('users').child(snap.key).child('shareCalendars').child(this.state.calendarKey).child('events').child(this.state.eventKey).remove();
                  }
                }
              });
            });
          }
      
          if(this.state.calendarType == 'shareCalendars'){
            firebase.database().ref().child('users').once('value', snapshot =>{
              snapshot.forEach(snap => {
                if(snap.key != this.state.username){
                  if(typeof snap.val().calendars !== 'undefined'){
                    snap.forEach(s => {
                      if(s.key == 'calendars'){
                        s.forEach(e => {
                          if(e.key == this.state.calendarKey){
                            firebase.database().ref().child('users').child(snap.key).child('calendars').child(this.state.calendarKey).child('events').child(this.state.eventKey).remove();

                          }
                        });
                      }
                    });
                  }
                  if(typeof snap.val().shareCalendars !== 'undefined'){
                    firebase.database().ref().child('users').child(snap.key).child('shareCalendars').child(this.state.calendarKey).child('events').child(this.state.eventKey).remove();

                }
                }
              });
            });
          }
    }

    render() {
        const { eventKey, notificationTime, isVisible, startTime, endTime, description } = this.state;

        return (
            <View style={{
                backgroundColor: '#2B2A2A',
                flex: 1
            }}>

                <View style={styles.dataView}>
                    <Text style={{ color: "#fff", fontSize: 20 }}>Início </Text>
                    <Text style={{ color: "#fff", fontSize: 20, marginEnd: '4%' }}> {startTime}</Text>
                </View>

                <View style={styles.dataView}>
                    <Text style={{ color: "#fff", fontSize: 20 }}>Fim </Text>
                    <Text style={{ color: "#fff", fontSize: 20, marginEnd: '4%' }}> {endTime}</Text>
                </View>

                <View>
                    <Text style={styles.titleText}>
                        Descrição
                </Text>
                    <Text style={styles.normalText}>
                        {description}
                    </Text>
                </View>

                <View>
                    <Text style={styles.titleText}>
                        Notificações
                </Text>
                    <Text style={styles.normalText}>
                        {Moment(notificationTime).format('HH:mm') + " antes do evento"}
                    </Text>
                    <TouchableOpacity style={styles.add}
                        onPress={() => this.setState({ isVisible: !this.state.isVisible })}
                    >

                        <Text style={{ color: "#f0980c" }}>Adicionar notificações</Text>
                    </TouchableOpacity>

                    <DateTimePicker
                        isVisible={isVisible}
                        mode="time"
                        display="spinner"
                        onConfirm={this.handlePicker}
                        onCancel={() => this.setState({ isVisible: false })}

                    />
                </View>

                <View>
                    <Text style={styles.titleText}>
                        Partilhar com...
                </Text>
                    <TouchableOpacity style={styles.add} onPress={() => console.log(eventKey)}>
                        <Text style={{ color: "#2073f7" }}>Selecionar utilizadores</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Editar Evento', {calendarKey : this.state.calendarKey, eventKey : this.state.eventKey, calendarType: this.state.calendarType})}>
                        <Text>editar</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity onPress={this.removeEvent}>
                        <Text>remover</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

}
