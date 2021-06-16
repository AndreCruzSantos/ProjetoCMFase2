import { firebase } from '@react-native-firebase/auth';
import React from 'react';
import { View, Image, Text, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import prompt from 'react-native-prompt-android';

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

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig, name);
}

export default class CalendarsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            calendarsArr: []
        };
    }

    componentDidMount() {
        this.getAuthUsername();
    }

    promptCreateCalendar = () => {
        prompt('Criar Calendário', 'Insira o nome do calendário a criar.',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'OK', onPress: title => this.createCalendar(title), style: 'ok' },
            ],
            {
                type: 'plain-text',
                cancelable: false,
                placeholder: 'Escreva aqui...'
            }
        );
    }

    createCalendar = (title) => {
        firebase.database().ref().child('users').child(this.state.username).child('calendars').push().set({ 'title': title }).then((snapshot) => {
            Alert.alert('Calendário criado com sucesso!');
        }).then(this.getAllCalendars());
    }

    getAllCalendars = () => {
        firebase.database().ref().child('users').child(this.state.username).child('calendars').once('value', snapshot => {
            const newArr = [];
            snapshot.forEach(snap => {
                newArr.push({
                    'title' : snap.val().title,
                    'key' : snap.key,
                }
                );
            });
            this.setState({ calendarsArr: newArr });
        });
            

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
            this.getAllCalendars();
        });
    }

    render() {
        const array = this.state.calendarsArr;
        return (
            <ScrollView style={styles.scrollview}>
                <View style={styles.calendarType}>
                    <View style={styles.category_btn}>
                        <Text style={styles.category}>Meus Calendários</Text>
                        <TouchableOpacity onPress={this.promptCreateCalendar}>
                            <Image style={styles.btnbig} source={require('../images/add_orange.png')}></Image>
                        </TouchableOpacity>
                    </View>
                    {
                        array.map(elem => {
                            return(
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('CalendárioTeste',{ calendarKey: elem.key } )}>    
                            <View style={styles.item_btn}>
                                <Text style={styles.item}>{elem.title}</Text>
                                <View style={styles.btns}>
                                    <TouchableOpacity>
                                        <Image style={styles.btnsmall} source={require('../images/edit_grey.png')}></Image>
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image style={styles.btnsmall} source={require('../images/trash_grey.png')}></Image>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </ScrollView>
        );
    }
}

var styles = {
    background: {

    },
    scrollview: {
        backgroundColor: '#2B2A2A',
        flex: 1
    },
    calendarType: {

    },
    category: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FF8000',
        marginLeft: 10
    },
    item: {
        fontSize: 20,
        color: '#ffb56b',
        marginLeft: 10,
        textAlignVertical: "center"
    },
    btns: {
        flexDirection: 'row'
    },
    btnbig: {
        height: 45,
        width: 45,
        resizeMode: 'contain',
        flexDirection: 'row'
    },
    btnsmall: {
        marginRight: 15,
        height: 35,
        width: 35,
        resizeMode: 'contain',
        flexDirection: 'row',
    },
    category_btn: {
        marginTop: 20,
        marginRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    item_btn: {
        marginTop: 10,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#3f3f3f',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#000000'
    }
}