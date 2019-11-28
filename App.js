import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import ReminderSetup from './screens/ReminderSetup';
import ReminderScreen from './screens/ReminderScreen';
import EditReminder from './screens/EditReminder'
import {AsyncStorage } from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' + 'Shake or press menu button for dev menu',
});

/*export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.js</Text>
        <Text style={styles.instructions}>{instructions}</Text>
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});*/

class ApplicationState {
  constructor(){
    this.active = {};
    this.persistent = {};
    this.save = this.save.bind(this);
    this.load = this.load.bind(this);
  }

  async save(){
    //console.warn(JSON.stringify(this.persistent));
    try{
      await AsyncStorage.setItem('@cs330projectStorage', JSON.stringify(this.persistent));
    } catch(e){
      // do nothing
      throw e;
    }
  }

  async load(component) {
    
    try {
      var data = await AsyncStorage.getItem('@cs330projectStorage');
      this.persistent = await JSON.parse(data);
      component.setState({appState: await this});

    } catch(e) {
      throw e;
    }
  }
}

var appState = new ApplicationState();
console.log(appState.persistent);
setInterval(appState.save, 5000)

const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen, params: {appState: appState}},
  Profile: {screen: ReminderSetup, params: {appState: appState}},
  Reminder: {screen: ReminderScreen, params: {appState: appState}},
  Edit: {screen: EditReminder, params: {appState: appState}}
  
});

const App = createAppContainer(MainNavigator);

export default App;
