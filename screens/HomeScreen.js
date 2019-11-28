import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Image } from 'react-native';
import { FlatList, TouchableHighlight } from 'react-native-gesture-handler';
const bee = require("../images/bee.png");
const clock = require("../images/clock.png");
export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Welcome',
    headerStyle: {
      backgroundColor: '#4444f0',
    },
    headerTintColor: '#fff'
  };

  constructor(props){
    super(props);
    this.appState = props.navigation.state.params.appState;
    this.getReminders = this.getReminders.bind(this)
    this.state = {appState: this.appState};
    this.selectReminder = this.selectReminder.bind(this);
  }

  async componentWillMount(){
    await this.appState.load(this);
    this.setState({appState: this.appState})
  }

  selectReminder(index){
    const {navigate} = this.props.navigation;
    navigate('Edit', {appState: this.appState, index: index});
  }

  getReminders(){
    if(this.appState.persistent.reminders){
      return this.appState.persistent.reminders[0].btype
    }
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style = {styles.container}>
        <Button style = {styles.button}
          title="Create Reminder"
          onPress={() => navigate('Profile', {appState: this.appState})}
          color = "#4444f0"
        />

        <ReminderList 
          data={this.appState.persistent.reminders}
          selectReminder={this.selectReminder}
        />
      </View>
    );
  }
}

function ReminderItem({ data, onPress }) {
  return (
    <TouchableHighlight
        onPress={onPress}
        underlayColor="#eeeeee"
        >
    <View style={styles.item}>
      
      <View>
        <Text>{data.work_period}</Text>
        <Image 
          source={bee}
          style={{width: 20, height: 20}} />
      </View>
      <View>
        <Text>{data.break_period}</Text>
        <Image 
          source={clock}
          style={{width: 20, height: 20}}
        />
      </View>
      <Text style={styles.title}>{data.btype}</Text>
      
    </View>
    </TouchableHighlight>
  );
}

class ReminderList extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <FlatList 
        data={this.props.data}
        renderItem={({ item, index }) => (
          <ReminderItem
            data={item}
            key={index}
            onPress={() => this.props.selectReminder(index)} 
          />
        )}
      />
    )
    
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: '#F5FCFF',
    padding: 10
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
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});
