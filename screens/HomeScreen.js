import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <Button
        title="Create a Reminder"
        onPress={() => navigate('Profile', {name: 'Jane'})}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
