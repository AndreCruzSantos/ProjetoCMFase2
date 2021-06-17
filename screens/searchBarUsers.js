import React, { Component } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
import _ from 'lodash';
import firebase from '@react-native-firebase/app';
import { List, ListItem, SearchBar } from "react-native-elements";

export default class SearchBarUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      query: "",
    };
  }

  contains = ({ username, email }, query) => {
    if (username.toLowerCase().includes(query) || email.toLowerCase().includes(query)) {
      return true;
    }
    return false;
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  makeRemoteRequest = () => {
    this.setState({ loading: true });

    arr = [];
    firebase.database().ref().child('users').once('value', snapshot => {
      snapshot.forEach(snap => {
        user = {"username": snap.val().username, "email": snap.val().email};
        arr.push(user);
      });
      
    });
    this.setState({data: arr});

  };

  handleSearch = (text) => {
    const formatQuery = text.toLowerCase();
    const data = _.filter(this.state.data, user => {
      return this.contains(user, formatQuery);
    });
    this.setState({ query: formatQuery, data }), () => this.makeRemoteRequest();
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round onChangeText ={this.handleSearch}/>;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <SafeAreaView>
        <List containerStyle={{ borderTopWidth: 0, borderBottomWidth: 0 }}>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <ListItem
                title={item.username}
                subtitle={item.email}
                containerStyle={{ borderBottomWidth: 0 }}
              />
            )}
            keyExtractor={item => item.username}
            ItemSeparatorComponent={this.renderSeparator}
            ListHeaderComponent={this.renderHeader}
            ListFooterComponent={this.renderFooter}
            >
          </FlatList>
        </List>
      </SafeAreaView>
    );
  }
}
