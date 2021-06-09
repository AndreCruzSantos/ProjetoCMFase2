import React, { Component, useState } from 'react';
import {
    View,
    TextInput,
    Text,
    Animated,
    Switch,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native';

import DateTimePicker from "react-native-modal-datetime-picker";
import Moment from 'moment';
import MomentPT from 'moment/src/locale/pt';

class FloatingLabelInput extends Component {
    state = {
        isFocused: false,
    }


    UNSAFE_componentWillMount() {
        this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
    }

    handleFocus = () => this.setState({ isFocused: true });
    handleBlur = () => this.setState({ isFocused: false });

    componentDidUpdate() {
        Animated.timing(this._animatedIsFocused, {
            toValue: (this.state.isFocused ? 1 : 0 || this.props.value !== '') ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }

    render() {

        const { label, ...props } = this.props;
        const { isFocused } = this.state;
        const labelStyle = {
            position: 'absolute',
            left: 0,
            top: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [18, 0],
            }),
            fontSize: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 14],
            }),
            color: this._animatedIsFocused.interpolate({
                inputRange: [0, 1],
                outputRange: ['#000', '#000'],
            }),
        };
        return (
            <View style={{ paddingTop: 18 }}>
                <Animated.Text style={labelStyle}>
                    {label}
                </Animated.Text>
                <TextInput
                    {...props}
                    style={{ height: 39, fontSize: 15, color: '#000', borderBottomWidth: 1, borderBottomColor: '#555' }}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    blurOnSubmit
                //onSubmitEditing={console.log(this.props.value)}
                />


            </View>
        );
    }
}

var styles = {

    switchView: {
        marginLeft: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    dataView: {
        marginLeft: '6%',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

}


const EditEvent = ({ navigation }) => {

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <TouchableOpacity style={{ right: '35%' }} onPress={() => showConfirmDialog()}><Image style={{ height: 30, width: 30 }} source={require('../images/done.png')}></Image></TouchableOpacity>
        });
    }, [navigation]);

    const state = {
        value: '',
        description: '',
        location: '',
        isEnabled: false,
        startDate: new Date(),
        isVisible: false,
        endDate: new Date()
    }

    //Moment.defineLocale('pt', MomentPT);

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isEndDatePickerVisible, setEndDatePickerVisibility] = useState(false);
    const [isEnabled, setEnabled] = useState(false);
    const [value, handleTextChange] = useState('Olá');
    const [description, handleDescriptionChange] = useState('Texto de Exemplo');
    const [location, handleLocationChange] = useState('Quando o user carregar no editar');

    const [startDate, setStartDate] = useState(new Date());

    const [endDate, setEndDate] = useState(new Date());

    const toggleEnable = () => setEnabled(!isEnabled)

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const showEndDatePicker = () => {
        setEndDatePickerVisibility(true);
    };

    const hideEndDatePicker = () => {
        setEndDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setStartDate(date);
        hideDatePicker();
    };

    const handleEndConfirm = (date) => {
        setEndDate(date);
        hideEndDatePicker();
    };

    const handleTitleChange = (newText) => handleTextChange(newText)
    const handleDescriptionChangeText = (newText) => handleDescriptionChange(newText)
    const handleLocationChangeText = (newText) => handleLocationChange(newText)


    const [showConfirmBox, setShowConfirmBox] = useState(true);

    const showConfirmDialog = () => {
        return Alert.alert(
            "Terminar Alterações",
            "Tem a certeza que pretende terminar de realizar alterações?",
            [
                {
                    style: 'cancel',
                    text: "Cancelar",
                    onPress: () => {
                        setShowConfirmBox(false);
                    },
                },
                {
                    text: "Confirmar",
                    onPress: () => {
                        /*Adicionar aqui o que for necessário para editar um Post*/
                        console.log("Post Editado");
                        navigation.navigate('Página Evento');
                    }
                },
            ]
        );
    };

    const chooseStartDays = () => {
        if (!isEnabled) {
          return (
            <View>
              <Text style={{ color: "#000", fontSize: 15, marginEnd: '4%' }}> {Moment(startDate).format('DD ' + '' + 'MMMM' + ', ' + 'HH:mm')}</Text>
              <DateTimePicker
                isVisible={isDatePickerVisible}
                mode="datetime"
                display="spinner"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>
          );
        } else {
          return (
            <View>
              <Text style={{ color: "#000", fontSize: 15, marginEnd: '4%' }}> {Moment(startDate).format('DD ' + '' + 'MMMM')}</Text>
              <DateTimePicker
                isVisible={isDatePickerVisible}
                mode="date"
                display="spinner"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View>
          );
        }
      }
    
      const chooseEndDays = () => {
        if (!isEnabled) {
          return (
            <View>
              <Text style={{ color: "#000", fontSize: 15, marginEnd: '4%' }}> {Moment(endDate).format('DD ' + '' + 'MMMM' + ', ' + 'HH:mm')}</Text>
              <DateTimePicker
                isVisible={isEndDatePickerVisible}
                mode="datetime"
                display="spinner"
                onConfirm={handleEndConfirm}
                onCancel={hideEndDatePicker}
              />
            </View>
          );
        } else {
          return (
            <View>
              <Text style={{ color: "#000", fontSize: 15, marginEnd: '4%' }}> {Moment(endDate).format('DD ' + '' + 'MMMM')}</Text>
              <DateTimePicker
                isVisible={isEndDatePickerVisible}
                mode="date"
                display="spinner"
                onConfirm={handleEndConfirm}
                onCancel={hideEndDatePicker}
              />
            </View>
          );
        }
      }




    return (

        <View>

            <View style={{ margin: 20 }}>

                <FloatingLabelInput
                    label="Título"
                    value={value}
                    onChangeText={handleTitleChange}

                />

                <FloatingLabelInput
                    label="Descrição"
                    value={description}
                    onChangeText={handleDescriptionChangeText}
                />

                <FloatingLabelInput
                    label="Localização"
                    value={location}
                    onChangeText={handleLocationChangeText}
                />

            </View>


            <View style={styles.switchView}>
                <Text style={{ color: "#000", fontSize: 20 }}>
                    O dia todo
          </Text>
                <Switch style={{ marginEnd: '4%' }}
                    trackColor={{ true: 'green', false: 'grey' }}
                    onValueChange={toggleEnable}
                    value={isEnabled}
                >
                </Switch>
            </View>


            <View style={{ marginTop: 20 }}>
                <TouchableOpacity style={styles.dataView}
                    onPress={showDatePicker}>
                    <Text style={{ color: "#000", fontSize: 20 }}>Início </Text>
                    {chooseStartDays()}
                </TouchableOpacity>

            </View>

            <View style={{ marginTop: 20 }}>
                <TouchableOpacity style={styles.dataView}
                    onPress={showEndDatePicker}>
                    <Text style={{ color: "#000", fontSize: 20 }}>Fim </Text>
                    {chooseEndDays()}
                </TouchableOpacity>



            </View>

        </View>
    );

}

export default EditEvent;