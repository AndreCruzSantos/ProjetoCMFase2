import React from 'react';
import type {Node} from 'react';
import Login from "./screens/login.js"
import Register from "./screens/register.js"
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import Home from './screens/home';
import CreateEvent from './screens/create_event';
import UserProfile from './screens/userProfile';
import Event from './screens/event_page';
import EditEvent from './screens/edit_event';
import Calendar from './screens/calendar';
import ForgotPassword from './screens/forgotPassword';
import ChangePassword from './screens/changePassword';
import SelectMap from './screens/map';
import { StatusBar } from 'react-native';


const Stack = createStackNavigator();

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
        <Stack.Screen name="CalendarPage" component={Calendar} options={{title: 'Calendário', headerStyle: { backgroundColor: '#FF8000' }, headerTintColor: '#FFFFFF'}}></Stack.Screen>
        <Stack.Screen name="CreateEventPage" component={CreateEvent} options={{title: 'Criar um Evento', headerStyle: { backgroundColor: '#FF8000' }, headerTintColor: '#FFFFFF'}}></Stack.Screen>
        <Stack.Screen name="EventPage" component={Event} options={{title: 'Página do Evento', headerStyle: { backgroundColor: '#FF8000' }, headerTintColor: '#FFFFFF'}}></Stack.Screen>
        <Stack.Screen name="LoginPage" component={Login} options={{headerShown: false, title: 'Login', headerStyle: { backgroundColor: '#FF8000' }, headerTintColor: '#FFFFFF'}}></Stack.Screen>
        <Stack.Screen name="RegisterPage" component={Register} options={{headerShown: false, title: 'Registar', headerStyle: { backgroundColor: '#FF8000' }, headerTintColor: '#FFFFFF'}}></Stack.Screen>
        <Stack.Screen name="ChangePasswordPage" component={ChangePassword} options={{title: 'Alterar a Password', headerStyle: { backgroundColor: '#FF8000' }, headerTintColor: '#FFFFFF'}}></Stack.Screen>
        <Stack.Screen name="HomePage" component={Home} options={{title: 'Página Principal', headerStyle: { backgroundColor: '#FF8000' }, headerTintColor: '#FFFFFF'}}></Stack.Screen>
        <Stack.Screen name="EditEventPage" component={EditEvent} options={{title: 'Editar o Evento', headerStyle: { backgroundColor: '#FF8000' }, headerTintColor: '#FFFFFF'}}></Stack.Screen>
        <Stack.Screen name="ProfilePage" component={UserProfile} options={{title: 'Perfil', headerStyle: { backgroundColor: '#FF8000' }, headerTintColor: '#FFFFFF'}}></Stack.Screen>
        <Stack.Screen name="ForgotPasswordPage" component={ForgotPassword} options={{headerShown: false, title: 'Recuperar a Password', headerStyle: { backgroundColor: '#FF8000' }, headerTintColor: '#FFFFFF'}}></Stack.Screen>
        <Stack.Screen name="MapPage" component={SelectMap} options={{title: 'Selecione uma Localização', headerStyle: { backgroundColor: '#FF8000' }, headerTintColor: '#FFFFFF'}}></Stack.Screen>
      </Stack.Navigator>
      <StatusBar backgroundColor='#2B2A2A' barStyle='light-content' />
    </NavigationContainer>
  );
};

export default App;