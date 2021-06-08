import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import CalendarsScreen from './screens/Home';

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Calendário">
                <Stack.Screen name="Calendário" component={CalendarsScreen}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
*/

import React from 'react';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import CalendarsScreen from './screens/Home';

const Stack = createStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Calendário">
                <Stack.Screen name="Calendário" component={CalendarsScreen}></Stack.Screen>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
