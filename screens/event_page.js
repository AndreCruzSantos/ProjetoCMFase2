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
import firebase from '@react-native-firebase/app';


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
        marginLeft: '5.6%'
    },
    normalText: {
        fontSize: 15,
        marginLeft: '6%',
        marginTop: '1%',
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
            notificationTime: new Date('December 25, 1995 12:00'),
            isVisible: false,
            startTime: '',
            endTime: '',
            description: '',
            title: '',
            username: '',
            calendarKey: props.route.params.calendarKey,
        }
    }

    static navigationOptions = {
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
    };

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
        firebase.database().ref().child('users').child(this.state.username).child('calendars').child(this.state.calendarKey).child('events').child(this.state.eventKey).once('value', snapshot => {
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

    render() {
        const { eventKey, notificationTime, isVisible, startTime, endTime, description } = this.state;

        return (
            <View>

                <View style={styles.dataView}>
                    <Text style={{ color: "#000", fontSize: 20 }}>Início </Text>
                    <Text style={{ color: "#000", fontSize: 20, marginEnd: '4%' }}> {startTime}</Text>
                </View>

                <View style={styles.dataView}>
                    <Text style={{ color: "#000", fontSize: 20 }}>Fim </Text>
                    <Text style={{ color: "#000", fontSize: 20, marginEnd: '4%' }}> {endTime}</Text>
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

            </View>
        );
    }

}



//export default EventPage;