import React from 'react';
import { View, Image, Text, Button, ScrollView, TouchableOpacity } from 'react-native';

export default class CalendarsScreen extends React.Component {
    render() {
        return (
            <ScrollView style={styles.scrollview}>
                <View>
                    <View style={styles.category_btn}>
                        <Text style={styles.category}>Meus Calendários</Text>
                        <TouchableOpacity>
                            <Image style={styles.btnbig} source={require('../images/add.png')}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.item_btn}>
                        <Text style={styles.item}>Praia</Text>
                        <View style={styles.btns}>
                            <TouchableOpacity>
                                <Image style={styles.btnsmall} source={require('../images/edit.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image style={styles.btnsmall} source={require('../images/trash.png')}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.item_btn}>
                        <Text style={styles.item}>Piscina</Text>
                        <View style={styles.btns}>
                            <TouchableOpacity>
                                <Image style={styles.btnsmall} source={require('../images/edit.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image style={styles.btnsmall} source={require('../images/trash.png')}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={styles.category_btn}>
                        <Text style={styles.category}>Meus Calendários</Text>
                        <TouchableOpacity>
                            <Image style={styles.btnbig} source={require('../images/add.png')}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.item_btn}>
                        <Text style={styles.item}>Praia</Text>
                        <View style={styles.btns}>
                            <TouchableOpacity>
                                <Image style={styles.btnsmall} source={require('../images/edit.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image style={styles.btnsmall} source={require('../images/trash.png')}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.item_btn}>
                        <Text style={styles.item}>Piscina</Text>
                        <View style={styles.btns}>
                            <TouchableOpacity>
                                <Image style={styles.btnsmall} source={require('../images/edit.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image style={styles.btnsmall} source={require('../images/trash.png')}></Image>
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
        backgroundColor: '#65ff00',
        flex: 1
    },
    scrollview: {
    },
    category: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 10
    },
    item: {
        fontSize: 20,
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