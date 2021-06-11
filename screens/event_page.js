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

const EventPage = ({ navigation }) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <View style={styles.icons}>
                <TouchableOpacity style={{ right: '45%' }} onPress={() => navigation.navigate('Editar Evento')}>
                    <Image style={{ height: 30, width: 30 }} source={require('../images/edit.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={{ right: '35%' }} onPress={() => showConfirmDialog()}>
                    <Image style={{ height: 30, width: 30 }} source={require('../images/trash.png')}></Image>
                </TouchableOpacity>
            </View>
        });
    }, [navigation]);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [timeForNotif, setTimeForNotif] = useState(new Date('December 25, 1995 12:00'));

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setTimeForNotif(date);
        /*Dar update na base de dados para o novo tempo de notificação*/ 
        hideDatePicker();
    };

    const [showConfirmBox, setShowConfirmBox] = useState(true);

    const showConfirmDialog = () => {
        return Alert.alert(
            "Eliminar Evento",
            "Tem a certeza que pretende eliminar este evento?",
            [
                {
                    style: 'cancel',
                    text: "Cancelar",
                    onPress: () => {
                        setShowConfirmBox(false);
                    },
                },
                {
                    style: 'destructive',
                    text: "Eliminar",
                    onPress: () => {
                        /*Adicionar aqui o que for necessário para eliminar um Post*/
                        console.log("Post Eliminado");
                    }
                },
            ]
        );
    };

    return (
        <View>

            <View style={styles.dataView}>
                <Text style={{ color: "#000", fontSize: 20 }}>Início </Text>
                <Text style={{ color: "#000", fontSize: 20, marginEnd: '4%' }}> 18:00</Text>
            </View>

            <View style={styles.dataView}>
                <Text style={{ color: "#000", fontSize: 20 }}>Fim </Text>
                <Text style={{ color: "#000", fontSize: 20, marginEnd: '4%' }}> 20:00</Text>
            </View>

            <View>
                <Text style={styles.titleText}>
                    Descrição
                </Text>
                <Text style={styles.normalText}>
                    Descrição para os moqups da
                    aplicação de Agenda Colaborativa
                    que estamos a desenvolver em
                    CM (Computação Móvel)
                </Text>
            </View>

            <View>
                <Text style={styles.titleText}>
                    Notificações
                </Text>
                <Text style={styles.normalText}>
                    {Moment(timeForNotif).format('HH:mm') + " antes do evento"}
                </Text>
                <TouchableOpacity style={styles.add} onPress={showDatePicker}>
                    <Text style={{ color: "#f0980c" }}>Adicionar notificações</Text>
                </TouchableOpacity>

                <DateTimePicker
                    isVisible={isDatePickerVisible}
                    mode="time"
                    display="spinner"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}

                />
            </View>

            <View>
                <Text style={styles.titleText}>
                    Partilhar com...
                </Text>
                <TouchableOpacity style={styles.add}>
                    <Text style={{ color: "#2073f7" }}>Selecionar utilizadores</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

var styles = {
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

export default EventPage;