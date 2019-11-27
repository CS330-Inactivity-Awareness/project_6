import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Image } from 'react-native';
export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Welcome',
    headerStyle: {
      backgroundColor: '#4444f0',
    },
    headerTintColor: '#fff'
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style = {styles.container}>
      <Text style = {styles.welcome}>
        Tap "Create a Reminder" to begin!
      </Text>
      <Image
        style = {styles.imageStyle}
        source = {require("../images/reminder_ribbon.png")}
      />
      <Button style = {styles.button}
        title="Create a Reminder"
        onPress={() => navigate('Profile', {name: 'Jane'})}
        color = "#4444f0"
      />
      </View>
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
  imageStyle:{
    height: 150,
    width: 150,
    alignItems: 'center',
    left: 105,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-evenly'
  },

  input_text: {
    flex: 1,
    textAlign: 'left',
    fontSize: 20,
  },


  type_box: {
     borderColor: 'gray',
     borderWidth: 1,
     height: '40%',
     width: '20%',
     textAlign: 'center',
     fontSize: 20,
     flex: 1,
  },

  button: {
    textAlign: 'center',
    color: '#4444f0',
    height: '100%',
    width: '80%'
  },

  input_row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: '7%',
    paddingRight: '7%',
  },

  button_view: {
    flex: 1
  }
});
