import React from 'react';
import { View, Image, Text, Button, ScrollView, TouchableOpacity, Alert } from 'react-native';
import prompt from 'react-native-prompt-android';

export default class CalendarsScreen extends React.Component {
    promptCreateCalendar = () => {
        prompt('Criar Calendário', 'Insira o nome do calendário a criar.', 
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'OK', onPress: password => console.log('OK Pressed'), style: 'ok'},
            ],
            {
                type: 'plain-text',
                cancelable: false,
                placeholder: 'Escreva aqui...'
            }
        );
    }

    render() {
        return (
            <ScrollView style={styles.scrollview}>
                <View>
                    <View style={styles.category_btn}>
                        <Text style={styles.category}>Meus Calendários</Text>
                        <TouchableOpacity onPress={this.promptCreateCalendar}>
                            <Image style={styles.btnbig} source={require('../images/add_orange.png')}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.item_btn}>
                        <Text style={styles.item}>Praia</Text>
                        <View style={styles.btns}>
                            <TouchableOpacity>
                                <Image style={styles.btnsmall} source={require('../images/edit_white.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image style={styles.btnsmall} source={require('../images/trash_white.png')}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.item_btn}>
                        <Text style={styles.item}>Piscina</Text>
                        <View style={styles.btns}>
                            <TouchableOpacity>
                                <Image style={styles.btnsmall} source={require('../images/edit_white.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image style={styles.btnsmall} source={require('../images/trash_white.png')}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.item_btn}>
                        <Text style={styles.item}>Volta ao Mundo</Text>
                        <View style={styles.btns}>
                            <TouchableOpacity>
                                <Image style={styles.btnsmall} source={require('../images/edit_white.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image style={styles.btnsmall} source={require('../images/trash_white.png')}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
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
    category: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#FF8000',
        marginLeft: 10
    },
    item: {
        fontSize: 20,
        color: '#FFFFFF',
        marginLeft: 10
    },
    btns: {
        flexDirection: 'row',
    },
    btnbig: {
        height: 45,
        width: 45,
        resizeMode: 'contain',
        flexDirection: 'row'
    },
    btnsmall: {
        marginRight: 15,
        height: 30,
        width: 30,
        resizeMode: 'contain',
        flexDirection: 'row'
    },
    category_btn: {
        marginTop: 20,
        marginRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    item_btn: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}