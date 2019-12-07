import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Image, Dimensions} from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import StyleableButton from '../StyleableButton'
const {height} = Dimensions.get('window');
const bee = require("../images/bee.png");
const clock = require("../images/clock.png");
const work_time = require("../images/work_time.png");
const work_out = require("../images/weights.png");
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
    //this.setState({appState: this.appState})
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

        
        <Text style = {styles.welcome}>
          Tap "Create a Reminder" to begin!
        </Text>
        <Image
          style = {styles.imageStyle}
          source = {require("../images/reminder_ribbon.png")}
        />
        <StyleableButton style = {styles.button} textStyle={styles.buttonText}
          title="Create a Reminder"
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
    <TouchableOpacity
        onPress={onPress}
        underlayColor="#eeeeee"
        >
    <View style={styles.item}>
      
      <View style={styles.itemColumn}>
        <Text style={styles.itemText}>{data.work_period}</Text>
        <View>
        <Image 
          source={work_time}
          style={{width: 20, height: 20}} />
        </View>
      </View>
      <View style={styles.itemColumn}>
        <Text style={styles.itemText}>{data.break_period}</Text>
        <Image 
          source={clock}
          style={{width: 20, height: 20, flex: 1}}
        />
      </View>
      <View style={styles.itemColumn}>
        {
          data.btype === "free_time" &&
          <Image
            source={bee}
            style={{width: 40, height: 40}}
          />
        }
        {
          data.btype === "exercise" &&
          <Image
            source={work_out}
            style={{width: 40, height: 40}}
          />
        }
        
      </View>
      
    </View>
    </TouchableOpacity>
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
    alignItems: 'stretch',
    padding: '3%'
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
    backgroundColor: '#4444f0',
    marginVertical: '4%',
    borderWidth: 2,
    fontSize: 20,
    borderRadius: 50,
    borderColor: '#CCCCCC' 
  },

  buttonText:{
    fontSize: 16,
    padding: '5%',
    textAlign: 'center',
    color: "#ffffff",
    fontWeight: '900'
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
    backgroundColor: '#EEEEEE',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderColor: '#4444f0',
    borderWidth: 2,
    borderRadius: 25,
    flexDirection: 'row'
  },
  itemColumn: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemText: {
    marginBottom: '10%',
    textAlign:'center', 
    fontSize: 16,
    fontWeight: '600'
  }
});
