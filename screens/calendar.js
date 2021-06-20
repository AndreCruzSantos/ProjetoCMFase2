import React, { Component, useState } from 'react';
import {
    View,
    TextInput,
    Text,
    Animated,
    Switch,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert
} from 'react-native';

import { Calendars, CalendarList, Agenda } from 'react-native-calendars';
import firebase from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

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
  
  const name = {
    name: 'DB_ANDRE'
  };
  
  
    firebase.initializeApp(firebaseConfig, name);
  

export default class Calendar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            items: {},
            calendarKey: props.route.params.calendarKey,
            username: ''
        };

    }

    getAuthUsername = () => {
        firebase.app('DB_ANDRE').database().ref().child('users').orderByChild('email').equalTo(firebase.auth().currentUser.email).once('value').then(snapshot => {
            if (snapshot.exists()) {
                snapshot.forEach((snap) => {
                    this.setState({
                        username: snap.key
                    });
                });
            }
            this.loadAllCalendars();
        });
    }

    loadAllCalendars = () => {
        const empty = {};
        this.setState({
            items: {}
        });

        const ola = firebase.app('DB_ANDRE').database().ref().child('users').child(this.state.username).child('calendars').child(this.state.calendarKey).child('events');
        const teste = ola.on('value', snapshot => {
            snapshot.forEach(snap => {
                const key = snap.val().startDate;
                if (!this.state.items[key]) {
                    this.state.items[key] = [];
                    this.state.items[key].push({
                        key: snap.key,
                        title: snap.val().title,
                        description: snap.val().description,
                        location: snap.val().location,
                        startDate: snap.val().startDate,
                        endDate: snap.val().endDate
                    });
                } else {
                    if (snap.val().startDate == key) {

                        this.state.items[key].push({
                            key: snap.key,
                            title: snap.val().title,
                            description: snap.val().description,
                            location: snap.val().location,
                            startDate: snap.val().startDate,
                            endDate: snap.val().endDate
                        });



                    }
                }

            });

            const newItems = {};
            Object.keys(this.state.items).forEach(key => {
                newItems[key] = this.state.items[key];
            });
            this.setState({
                items: newItems,
                ref: ola,
                callB: teste,
            });
        });


    }

    componentDidMount() {
        this.props.navigation.addListener('focus', () => { this.getAuthUsername()});
    }

    render() {
        
        return (
            <View style={{ flex: 1}}>
                <Agenda
                    items={this.state.items}
                    selected={new Date()}
                    renderItem={this.renderItem.bind(this)}
                    renderEmptyDate={this.renderEmptyDate.bind(this)}
                    rowHasChanged={this.rowHasChanged.bind(this)}

                    theme={{
                        selectedDayBackgroundColor: '#FF8000',
                        dotColor: 'black',
                        selectedDotColor: 'white',
                        backgroundColor: '#2B2A2A'
                    }}
                />

                <TouchableOpacity activeOpacity={0.7}
                    onPress={() => this.props.navigation.navigate('CreateEventPage', {calendarKey : this.state.calendarKey})}
                    style={styles.addButton}>
                    <Image source={require('../images/add_white.png')}></Image>
                </TouchableOpacity>

            </View>
        );
    }

    loadItems(day) {
        setTimeout(() => {
            for (let i = -15; i < 85; i++) {

                const time = day.timestamp + i * 24 * 60 * 60 * 1000;

                const strTime = this.timeToString(time);
                if (!this.state.items[strTime]) {
                    this.state.items[strTime] = [];
                    const numItems = Math.floor(Math.random() * 3 + 1);
                    for (let j = 0; j < numItems; j++) {
                        this.state.items[strTime].push({
                            name: 'Item for ' + strTime + ' #' + j,
                            height: Math.max(50, Math.floor(Math.random() * 150))
                        });
                    }
                }
            }
            const newItems = {};
            Object.keys(this.state.items).forEach(key => {
                newItems[key] = this.state.items[key];
            });
            this.setState({
                items: newItems
            });
        }, 1000);
    }


    /*loadTeste() {
        
        const empty = {};
        this.setState({
            items: empty
        });
        console.log(this.state.items);
        const ola = firebase.database().ref().child('events');
        const teste = ola.on('value', snapshot => {
            snapshot.forEach(snap => {
                const key = snap.val().startDate;
                if(!this.state.items[key]){
                    this.state.items[key] = [];
                    this.state.items[key].push({
                        key: snap.key,
                        title: snap.val().title,
                        description: snap.val().description,
                        location: snap.val().location,
                        startDate: snap.val().startDate,
                        endDate: snap.val().endDate
                    });
                }else{
                    if(snap.val().startDate == key){
   
                                this.state.items[key].push({
                                    key: snap.key,
                                    title: snap.val().title,
                                    description: snap.val().description,
                                    location: snap.val().location,
                                    startDate: snap.val().startDate,
                                    endDate: snap.val().endDate
                                });
                            
                    
                        
                    }
                }
                
            });
    
            const newItems = {};
            Object.keys(this.state.items).forEach(key => {
                newItems[key] = this.state.items[key];
            });
            this.setState({
                items: newItems,
                ref: ola,
                callB: teste,
            });
            //firebase.database().ref().child('events').off('value', teste);
        });

    }*/

    renderItem(item) {
        return (
            <TouchableOpacity
                style={[styles.item]}
                onPress={() => this.props.navigation.navigate('EventPage', { eventKey: item.key, calendarKey: this.state.calendarKey })}
            >
                <Text>{item.title}</Text>
            </TouchableOpacity>
        );
    }

    renderEmptyDate() {
        return (
            <View style={styles.emptyDate}>
                <Text>This is empty date!</Text>
            </View>
        );
    }

    rowHasChanged(r1, r2) {
        return r1.name !== r2.name;
    }

    timeToString(time) {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }



}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30
    },
    addButton: {
        position: 'absolute',
        width: 50,
        height: 50,
        right: 30,
        bottom: 30,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        backgroundColor: '#FF8000',
    }
});


