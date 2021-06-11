/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
   
import React from 'react';
import type {Node} from 'react';
import Login from "./screens/login.js"
import Register from "./screens/register.js"
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import CalendarsScreen from './screens/Home';
import CreateEvent from './screens/create_event';
import UserProfile from './screens/userProfile.js';

const Stack = createStackNavigator();

        

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen name="Criar Evento" component={CreateEvent}></Stack.Screen>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Calendário" component={CalendarsScreen}></Stack.Screen>
        <Stack.Screen name="Perfil de Utilizador" component={UserProfile}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
