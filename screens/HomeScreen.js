import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Welcome',
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style = {styles.button_view}>
      <Button style = {styles.button}
        title="Create a Reminder"
        onPress={() => navigate('Profile', {name: 'Jane'})}
        color = "#4444f0"
      />
<<<<<<< HEAD
      </View>

=======
>>>>>>> a95ccf7c429aa73236c4a6d09489092083db87d1
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
