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
import EventPage from './screens/event_page';
import EditEvent from './screens/edit_event';


const Stack = createStackNavigator();

        

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Criar Evento">
        <Stack.Screen name="Criar Evento" component={CreateEvent}></Stack.Screen>
        <Stack.Screen name="Página Evento" component={EventPage}></Stack.Screen>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Calendário" component={CalendarsScreen}></Stack.Screen>
        <Stack.Screen name="Editar Evento" component={EditEvent}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
