import React from 'react';
import type {Node} from 'react';
import Login from "./screens/login.js"
import Register from "./screens/register.js"
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import CalendarsScreen from './screens/Home';
import CreateEvent from './screens/create_event';
import UserProfile from './screens/userProfile';
import EventPage from './screens/event_page';
import EditEvent from './screens/edit_event';
import Calendar from './screens/calendar';
import ForgotPassword from './screens/forgotPassword';
import Search from './screens/searchBarUsers';
import changePassword from './screens/changePassword';
import MapScreen from './screens/map';


const Stack = createStackNavigator();

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Search">
        <Stack.Screen name="CalendárioTeste" component={Calendar}></Stack.Screen>
        <Stack.Screen name="Criar Evento" component={CreateEvent}></Stack.Screen>
        <Stack.Screen name="Página Evento" component={EventPage}></Stack.Screen>
        <Stack.Screen name="Login" component={Login}></Stack.Screen>
        <Stack.Screen name="Register" component={Register}></Stack.Screen>
        <Stack.Screen name="ChangePassword" component={changePassword}></Stack.Screen>
        <Stack.Screen name="Calendário" component={CalendarsScreen}></Stack.Screen>
        <Stack.Screen name="Editar Evento" component={EditEvent}></Stack.Screen>
        <Stack.Screen name="Perfil" component={UserProfile}></Stack.Screen>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}></Stack.Screen>
        <Stack.Screen name="Search" component={Search}></Stack.Screen> 
        <Stack.Screen name="Map" component={MapScreen}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;