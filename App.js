/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

/*
import React from 'react';
import type { Node } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section = ({ children, title }): Node => {
    const isDarkMode = useColorScheme() === 'dark';
    return ( <
        View style = { styles.sectionContainer } >
        <
        Text style = {
            [
                styles.sectionTitle,
                {
                    color: isDarkMode ? Colors.white : Colors.black,
                },
            ]
        } > { title } <
        /Text> <
        Text style = {
            [
                styles.sectionDescription,
                {
                    color: isDarkMode ? Colors.light : Colors.dark,
                },
            ]
        } > { children } <
        /Text> < /
        View >
    );
};

const App: () => Node = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    return ( <
        SafeAreaView style = { backgroundStyle } >
        <
        StatusBar barStyle = { isDarkMode ? 'light-content' : 'dark-content' }
        /> <
        ScrollView contentInsetAdjustmentBehavior = "automatic"
        style = { backgroundStyle } >
        <
        Header / >
        <
        View style = {
            {
                backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }
        } >
        <
        Section title = "Step One" >
        Edit < Text style = { styles.highlight } > App.js < /Text> to change this
        screen and then come back to see your edits. <
        /Section> <
        Section title = "See Your Changes" >
        <
        ReloadInstructions / >
        <
        /Section> <
        Section title = "Debug" >
        <
        DebugInstructions / >
        <
        /Section> <
        Section title = "Learn More" >
        Read the docs to discover what to do next:
            <
            /Section> <
        LearnMoreLinks / >
        <
        /View> < /
        ScrollView > <
        /SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default App;
*/

import React from 'react';
import { View, Image, Text, Button, ScrollView, TouchableOpacity } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';

class CalendarsScreen extends React.Component {
    render() {
        return (
            <ScrollView style={styles.scrollview}>
                <View>
                    <View style={styles.category_btn}>
                        <Text style={styles.category}>Meus Calendários</Text>
                        <TouchableOpacity>
                            <Image style={styles.btnbig} source={require('./images/add.png')}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.item_btn}>
                        <Text style={styles.item}>Praia</Text>
                        <View style={styles.btns}>
                            <TouchableOpacity>
                                <Image style={styles.btnsmall} source={require('./images/edit.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image style={styles.btnsmall} source={require('./images/trash.png')}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.item_btn}>
                        <Text style={styles.item}>Piscina</Text>
                        <View style={styles.btns}>
                            <TouchableOpacity>
                                <Image style={styles.btnsmall} source={require('./images/edit.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image style={styles.btnsmall} source={require('./images/trash.png')}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View>
                    <View style={styles.category_btn}>
                        <Text style={styles.category}>Meus Calendários</Text>
                        <TouchableOpacity>
                            <Image style={styles.btnbig} source={require('./images/add.png')}></Image>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.item_btn}>
                        <Text style={styles.item}>Praia</Text>
                        <View style={styles.btns}>
                            <TouchableOpacity>
                                <Image style={styles.btnsmall} source={require('./images/edit.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image style={styles.btnsmall} source={require('./images/trash.png')}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.item_btn}>
                        <Text style={styles.item}>Piscina</Text>
                        <View style={styles.btns}>
                            <TouchableOpacity>
                                <Image style={styles.btnsmall} source={require('./images/edit.png')}></Image>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image style={styles.btnsmall} source={require('./images/trash.png')}></Image>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                
            </ScrollView>
        );
    }
}

var styles = {
    background: {
        backgroundColor: '#65ff00',
        //justifyContent:'center',
        flex: 1
    },
    scrollview: {
    },
    category: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 10
    },
    item: {
        fontSize: 20,
        marginLeft: 10
    },
    btns: {
        flexDirection: 'row',
    },
    btnbig: {
        height: 45,
        width: 45,
        resizeMode: 'contain',
        flexDirection: 'row'
    },
    btnsmall: {
        marginRight: 15,
        height: 30,
        width: 30,
        resizeMode: 'contain',
        flexDirection: 'row'
    },
    category_btn: {
        marginTop: 20,
        marginRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    item_btn: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
}

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
