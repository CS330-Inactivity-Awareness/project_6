import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Picker, TextInput, Keyboard, TouchableWithoutFeedback} from 'react-native';
import ReminderScreen from './ReminderScreen';
import StyleableButton from '../StyleableButton'
export default class EditReminder extends React.Component {
  constructor(props){
    super(props);
    this.appState = props.navigation.state.params.appState;
    this.index = props.navigation.state.params.index;
    this.state = this.appState.persistent.reminders[this.index];
    this.onChangeWorkingPeriod = this.onChangeWorkingPeriod.bind(this);
    this.onChangeBreakPeriod = this.onChangeBreakPeriod.bind(this);
    this.saveReminder = this.saveReminder.bind(this);
  }

  onChangeWorkingPeriod(text){
    this.setState({work_period: text});
  }

  onChangeBreakPeriod(text){
    this.setState({break_period: text});
  }

  saveReminder(){
    const {navigate} = this.props.navigation;
    var reminder = {btype: this.state.btype, work_period: this.state.work_period, break_period: this.state.break_period, sound: this.state.sound};
    if (!this.appState.persistent.reminders){
      this.appState.persistent.reminders = [reminder];
    }
    else {
      this.appState.persistent.reminders[this.index] = reminder;
    }
    this.appState.save();
  
    navigate('Home', {appState: this.appState});
  }

  startReminder(){
    const {navigate} = this.props.navigation;
    var reminder = {appState: this.appstate, btype: this.state.btype, work_period: this.state.work_period, break_period: this.state.break_period, sound: this.state.sound};
    navigate('Reminder', reminder)
  }

  deleteReminder(){
      const {navigate} = this.props.navigation;
      this.appState.persistent.reminders.splice(this.index, 1);
      this.appState.save();
      navigate('Home', {appState: this.appState});
  }

  static navigationOptions = {
    title: 'Reminder Edit',
    headerStyle: {
      backgroundColor: '#4444f0',

    },
    headerTintColor: '#fff'
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
      <View style = {styles.container}>

        <View style={styles.input_row}>
          <Text style = {styles.input_text}>
            Work Period Length (minutes) {this.appState.s}
          </Text>

          <TextInput
            style={styles.type_box}
            onChangeText={text => this.onChangeWorkingPeriod(text)}
            value={this.state.work_period}
            keyboardType='numeric'>
          </TextInput>
        </View>

        <View style={styles.input_row}>
          <Text style = {styles.input_text}>
            Break Length (minutes)
          </Text>

          <TextInput
            style={ styles.type_box  }
            onChangeText={text => this.onChangeBreakPeriod(text)}
            value={this.state.break_period}
            keyboardType='numeric'>
          </TextInput>
        </View>
        <View style={styles.input_row}>
          <Text style = {styles.input_text}>
            Break Type
          </Text>

          <Picker
            selectedValue={this.state.btype}
            style={{height: 50, width: '80%', flex: 1, borderColor: 'gray', borderWidth: 1}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({btype: itemValue})
            }>
            <Picker.Item label="Exercise" value="exercise" />
            <Picker.Item label="Stretch" value="strech" />
            <Picker.Item label="Free Time" value="free_time" />
          </Picker>
          </View>
          <View style={styles.input_row}>
            <Text style = {styles.input_text}>
              Reminder Sound
            </Text>
          <Picker
          selectedValue={this.state.btype}
          style={{height: 80, width: '80%', flex: 1, borderColor: 'gray', borderWidth: 1}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({sound: itemValue})
          }>
          <Picker.Item label="Bell" value="bell" />
          <Picker.Item label="Buzzer" value="buzzer" />
          <Picker.Item label="Dream" value="dream" />
        </Picker>
        </View>
        <View style={styles.button_view}>
          <StyleableButton
            title="Start Reminder"
            onPress={() => navigate('Reminder', {name: 'Jane', work_period: this.state.work_period, break_period: this.state.break_period, sound: this.state.sound})}
            style = {styles.button}
            color = "#4444f0"
            textStyle = {styles.buttonText}
          />
        </View>
        <View style={styles.button_view}>
          <StyleableButton
            title="Save Reminder"
            onPress={() => this.saveReminder()}
            style = {styles.button}
            color = "#4444f0"
            textStyle = {styles.buttonText}
          />
        </View>
        <View style={styles.button_view}>
          <StyleableButton 
            title="Delete Reminder"
            onPress={() => this.deleteReminder()}
            style = {styles.redButton}
            color = "#ff0000"
            textStyle = {styles.buttonText}
          />
        </View>
      </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-evenly',
    padding: '3%'
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
  
  redButton: {
    textAlign: 'center',
    backgroundColor: '#ff0000',
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
  }


});
