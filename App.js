
import React, { Component, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  Animated,
  Switch,
  TouchableOpacity,
} from 'react-native';

import DateTimePicker from "react-native-modal-datetime-picker";

class FloatingLabelInput extends Component {
  state = {
    isFocused: false,
  }


  UNSAFE_componentWillMount(){
    this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);
  }

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  componentDidUpdate(){
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
        inputRange: [0,1],
        outputRange: [18,0],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0,1],
        outputRange: [20,14],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0,1],
        outputRange: ['#aaa','#aaa'],
      }),
    };
    return (
      <View style={{ paddingTop: 18}}>
        <Animated.Text style={labelStyle}>
          {label}
        </Animated.Text>
        <TextInput 
          {...props}
          style={{ height: 39, fontSize: 15, color: '#aaa', borderBottomWidth: 1, borderBottomColor: '#555' }}
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
    marginLeft:20, 
    flexDirection:'row', 
    justifyContent:'space-between'
  },
  dataView: {
    marginLeft:20, 
    flexDirection:'row', 
    justifyContent:'space-between'
  },
}

const Example = () => {
  
  const state = {
    value: '',
    description: '',
    location: '',
    isEnabled: false,
    startDate: new Date(),
    isVisible: false
  }

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isEnabled, setEnabled] = useState(false);
  const [value, handleTextChange] = useState('');
  const [description, handleDescriptionChange] = useState('');
  const [location, handleLocationChange] = useState('');
  
  const toggleEnable = () => setEnabled(!isEnabled)

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);

    //atribuir o valor date a uma variavel
    hideDatePicker();
  };

  const handleTitleChange = (newText) => handleTextChange(newText)
  const handleDescriptionChangeText = (newText) => handleDescriptionChange(newText)
  const handleLocationChangeText = (newText) => handleLocationChange(newText)
  

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
          <Text style={{color:"#aaa", fontSize: 20, }}>
            All day 
          </Text>
          <Switch style={{marginEnd:'4%'}}
            onValueChange={toggleEnable}
            value={isEnabled}
          >
          </Switch>
        </View>
        

        <View style={{marginTop: 20}}>
           <TouchableOpacity style={styles.dataView}
           onPress={showDatePicker}>
             <Text style={{color:"#aaa", fontSize: 20}}>Início </Text>
             <Text style={{color:"#aaa", fontSize: 15, marginEnd: '4%'}}> {state.startDate.toDateString()}</Text>
           </TouchableOpacity>

            <DateTimePicker
              isVisible={isDatePickerVisible}
              mode="date"
              display="spinner"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />

        </View>
 
      </View>
    );
  
}

export default Example;
