import React from 'react';
import type {Node} from 'react';
import Login from "./screens/login.js"
import Register from "./screens/register.js"
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import CalendarsScreen from './screens/Home';
import CreateEvent from './screens/create_event';
import ForgotPassword from './screens/forgotPassword';

const Stack = createStackNavigator();

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="Criar Evento" component={CreateEvent}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Calendário" component={CalendarsScreen}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;