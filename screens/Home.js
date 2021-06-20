import { firebase } from '@react-native-firebase/auth';
import React from 'react';
import { View, Image, Text, Button, ScrollView, TouchableOpacity, Alert, FlatList } from 'react-native';
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

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            calendarsArr: [],
            copiedCalendarsArr: [],
            sharedCalendarsArr: []
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

    promptEditCalendar = (key) => {
        prompt('Editar Calendário','Insira o novo nome do calendário.',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: text => this.editCalendar(key,text),style: 'ok'}
            ],
            {
                type: 'plain-text',
                cancelable: false,
                placeholder: 'Escreva aqui...'
            }
        );
    }

    editCalendar = (key,text) => {
        firebase.app('DB_ANDRE').database().ref().child('users').child(this.state.username).child('calendars').child(key).update({'title' : text}).then(
            firebase.app('DB_ANDRE').database().ref().child('users').once('value').then(snapshot => {
                snapshot.forEach(snap => {
                    if(snap.key != this.state.username){
                        if(typeof snap.val().shareCalendars !== 'undefined'){
                            firebase.app('DB_ANDRE').database().ref().child('users').child(snap.key).child('shareCalendars').child(key).update({'title' : text});
                        }
                    }
                });
            })
        ).then(this.getAllCalendars());
    }

    promptChooseUser = (key) => {
        prompt('Utilizador a partilhar', 'Escolha o utilizador a partilhar o calendário!', 
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Cópia', onPress: username => this.copyCalendar(key,username), style: 'ok'},
                {text: 'Compartilhar', onPress: username => this.shareCalendar(key,username), style: 'ok'}
            ],
            {
                type: 'plain-text',
                cancelable: false,
                placeholder: 'Escreva aqui...'
            }
        );
    }

    copyCalendar = (key,name) => {
        var copyUsername = '';
        if(name.length != 0){
            firebase.app('DB_ANDRE').database().ref().child('users').orderByChild('username').equalTo(name).once('value').then(snapshot =>{
                if(snapshot.exists()){
                    snapshot.forEach(elem => {
                        copyUsername = elem.key
                    });
                    firebase.app('DB_ANDRE').database().ref().child('users').child(this.state.username).child('calendars').child(key).once('value').then(snap => {
                        if(snap.exists()){
                            console.log(snap.val())
                            firebase.app('DB_ANDRE').database().ref().child('users').child(copyUsername).child('copiedCalendars').push().set(snap.val()).then();
                        }
                    });
                }
            });
        }
    }

    shareCalendar = (key,name) => {
        var copyUsername = '';
        if(name.length != 0){
            firebase.app('DB_ANDRE').database().ref().child('users').orderByChild('username').equalTo(name).once('value').then(snapshot =>{
                if(snapshot.exists()){
                    snapshot.forEach(elem => {
                        copyUsername = elem.key
                    });
                    firebase.app('DB_ANDRE').database().ref().child('users').child(this.state.username).child('calendars').child(key).once('value').then(snap => {
                        if(snap.exists()){
                            firebase.app('DB_ANDRE').database().ref().child('users').child(copyUsername).child('shareCalendars').child(key).set(snap.val()).then();
                        }
                    });
                }
            });
        }
    }

    createCalendar = (title) => {
        firebase.database().ref().child('users').child(this.state.username).child('calendars').push().set({ 'title': title }).then((snapshot) => {
            Alert.alert('Calendário criado com sucesso!');
            this.getAllCalendars()
        });
    }

    getAllCalendars = () => {
        firebase.database().ref().child('users').child(this.state.username).child('calendars').once('value', snapshot => {
            const newArr = [];
            snapshot.forEach(snap => {
                newArr.push({
                    'title' : snap.val().title,
                    'key' : snap.key,
                });
            });
            this.setState({ calendarsArr: newArr });
        }).then(
            firebase.app('DB_ANDRE').database().ref().child('users').child(this.state.username).child('copiedCalendars').once('value',snapshot => {
                const copiedArr = [];
                snapshot.forEach(snap => {
                    copiedArr.push({
                        'title' : snap.val().title,
                        'key' : snap.key
                    });
                });
                this.setState({copiedCalendarsArr : copiedArr});
            })
        ).then(
            firebase.app('DB_ANDRE').database().ref().child('users').child(this.state.username).child('shareCalendars').once('value',snapshot => {
                const sharedArr = [];
                snapshot.forEach(snap => {
                    sharedArr.push({
                        'title' : snap.val().title,
                        'key' : snap.key
                    });
                });
                this.setState({sharedCalendarsArr : sharedArr});
            })
        );
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
            this.getAllCalendars();
        });
    }

    deleteCalendar = (key,string) => {
        firebase.app('DB_ANDRE').database().ref().child('users').child(this.state.username).child(string).child(key).remove().then(
            this.getAllCalendars()
        );
    }

    render() {
        const array = this.state.calendarsArr;
        const copiedArray = this.state.copiedCalendarsArr;
        const sharedArray = this.state.sharedCalendarsArr;
        return (
          <View style={{
              flex: 1
          }}>
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
                                <TouchableOpacity onPress={() => this.props.navigation.navigate('CalendarPage',{ calendarKey: elem.key } )}>    
                                    <View style={styles.item_btn} key = {elem.key}>
                                        <Text style={styles.item}>{elem.title}</Text>
                                        <View style={styles.btns}>
                                            <TouchableOpacity onPress={() => this.promptEditCalendar(elem.key)}>
                                                <Image style={styles.btnsmall} source={require('../images/edit_grey.png')}></Image>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.deleteCalendar(elem.key,'calendars')}>
                                                <Image style={styles.btnsmall} source={require('../images/trash_grey.png')}></Image>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => this.promptChooseUser(elem.key)}>
                                                <Image style={styles.btnsmall} source={require('../images/share_grey.png')}></Image>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                              )
                            })
                        }
                </View>
                <View style={styles.calendarType}>
                    <View style={styles.category_btn}>
                        <Text style={styles.category}>Calendários Partilhados</Text>
                    </View>
                        {
                        copiedArray.map(elem => {
                            return(
                                
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('CalendarPage',{ calendarKey: elem.key } )}>    
                            <View style={styles.item_btn} key = {elem.key}>
                                <Text style={styles.item}>{elem.title}</Text>
                                <View style={styles.btns}>
                                    <TouchableOpacity onPress={() => this.deleteCalendar(elem.key,'copiedCalendars')}>
                                        <Image style={styles.btnsmall} source={require('../images/trash_grey.png')}></Image>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            </TouchableOpacity>
                            )
                        })
                    }
                </View>
                <View style={styles.calendarType}>
                    <View style={styles.category_btn}>
                        <Text style={styles.category}>Calendários Compartilhados</Text>
                    </View>
                    {
                        sharedArray.map(elem => {
                            return(  
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('CalendarPage',{ calendarKey: elem.key } )}>    
                            <View style={styles.item_btn} key = {elem.key}>
                                <Text style={styles.item}>{elem.title}</Text>
                                <View style={styles.btns}>
                                    <TouchableOpacity onPress={() => this.deleteCalendar(elem.key,'shareCalendars')}>
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
                <TouchableOpacity activeOpacity={0.7}
                    onPress={() => this.props.navigation.navigate('ProfilePage')}
                    style={styles.floatingBtn}>
                    <Image source={require('../images/profile_white.png')}></Image>
                </TouchableOpacity>
            </View>
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
        marginTop: 5,
        backgroundColor: '#383838'
    },
    category: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#FF8000',
        marginLeft: 10
    },
    item: {
        fontSize: 20,
        color: '#ffa042',
        marginLeft: 10,
        textAlignVertical: "center",
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
        marginTop: 10,
        marginBottom: 10,
        marginRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    item_btn: {
        marginTop: 0,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#333333',
        borderWidth: 2,
        borderRadius: 10,
        borderColor: '#000000',
        marginBottom: 5,
    },
    floatingBtn: {
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
}