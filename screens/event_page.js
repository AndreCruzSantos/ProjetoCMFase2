import React, { Component, useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    Alert,
    Button
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

const name = {
    name: 'DB_ANDRE'
};


    firebase.initializeApp(firebaseConfig, name);


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
    createEventView: {
        alignItems: 'center',
        marginTop: 100
      },
      createEventBtn: {
        justifyContent: 'space-between',
        flexDirection: 'row'
      },
      btnView1: {
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
    btnView2: {
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#FF8000',
        width: '50%',
        padding: 15,
        borderRadius: 10,
        shadowOpacity: 80,
        elevation: 15,
        marginTop: 50
    }
}


export default class EventPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            eventKey: props.route.params.eventKey,
            notificationTime: new Date('December 25, 1995 12:00'),
            isVisible: false,
            startTime: '',
            endTime: '',
            description: '',
            title: '',
            username: '',
            calendarKey: props.route.params.calendarKey,
        }

        /*EventPage.navigationOptions=({navigation}) =>{
            return {
                title: 'Teste',
                headerStyle: {
                    backgroundColor: 'green'
                },
                headerRight: () => (
                <View style={styles.icons}>
                    <TouchableOpacity style={{ right: '45%' }} onPress={() => navigation.navigate('Editar Evento')}>
                        <Image style={{ height: 30, width: 30 }} source={require('../images/edit.png')}></Image>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ right: '35%' }} onPress={() => showConfirmDialog()}>
                        <Image style={{ height: 30, width: 30 }} source={require('../images/trash.png')}></Image>
                    </TouchableOpacity>
                </View>
                )
            }
        }*/
    }
    
    static navigationOptions = ({navigation}) => ({
        title: 'OLÁ',
        headerRight: (
            <View style={styles.icons}>
        <TouchableOpacity style={{ right: '45%' }} onPress={() => navigation.navigate('Editar Evento')}>
            <Image style={{ height: 30, width: 30 }} source={require('../images/edit.png')}></Image>
        </TouchableOpacity>
        <TouchableOpacity style={{ right: '35%' }} onPress={() => showConfirmDialog()}>
            <Image style={{ height: 30, width: 30 }} source={require('../images/trash.png')}></Image>
        </TouchableOpacity>
        </View>
        )
    })
        
    
        
    

    getAuthUsername = () => {
        firebase.app('DB_ANDRE').database().ref().child('users').orderByChild('email').equalTo(firebase.auth().currentUser.email).once('value').then(snapshot => {
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
        firebase.app('DB_ANDRE').database().ref().child('users').child(this.state.username).child('calendars').child(this.state.calendarKey).child('events').child(this.state.eventKey).once('value', snapshot => {
            this.setState({
                startTime: Moment(snapshot.val().startDate).format('HH:mm'),
                endTime: Moment(snapshot.val().endDate).format('HH:mm'),
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
        firebase.app('DB_ANDRE').database().ref().child('users').child(this.state.username).child('calendars').child(this.state.calendarKey).child('events').child(this.state.eventKey).remove().then(this.props.navigation.reset({index:0, routes:[{name: 'CalendárioTeste', params: {calendarKey: this.state.calendarKey}}]}));
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

                <View style={styles.btnView1}>
                    <TouchableOpacity style={styles.createEventBtn}>
                        <Text style={{ color: "#FF8000" }}>Editar Evento</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnView2}>
                    <TouchableOpacity style={styles.createEventBtn} onPress={this.removeEvent}>
                        <Text style={{ color: "#ffffff" }}>Remover Evento</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

}
