
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CreateEvent from './screens/create_event';

const Stack = createStackNavigator();

function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Criar Evento">
        <Stack.Screen name="Criar Evento" component={CreateEvent}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

