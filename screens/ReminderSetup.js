import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Picker, TextInput, Keyboard, TouchableWithoutFeedback} from 'react-native';
export default class ProfileScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {btype: "exercise", work_period: '', break_period: '', sound: 'bell'};
    this.onChangeWorkingPeriod = this.onChangeWorkingPeriod.bind(this);
    this.onChangeBreakPeriod = this.onChangeBreakPeriod.bind(this);
  }

  onChangeWorkingPeriod(text){
    this.setState({work_period: text});
  }

  onChangeBreakPeriod(text){
    this.setState({break_period: text});
  }

  static navigationOptions = {
    title: 'Reminder Creation',
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
            Work Period Length (minutes)
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
            <Picker.Item label="Stretch" value="stretch" />
            <Picker.Item label="Stand Up" value="stand_up" />
            <Picker.Item label="Free Time" value="free_time" />
          </Picker>
          </View>

        <View style={styles.input_row}>
          <Text style = {styles.input_text}>
            Reminder Sound
          </Text>

          <Picker
            selectedValue={this.state.sound}
            style={{height: 50, width: '80%', flex: 1, borderColor: 'gray', borderWidth: 1}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({sound: itemValue})
            }>
            <Picker.Item label="Bell" value="bell" />
            <Picker.Item label="Buzzer" value="buzzer" />
            <Picker.Item label="Dream" value="dream" />
          </Picker>
        </View>
        <View style={styles.button_view}>
          <Button
            title="Set Reminder"
            onPress={() => navigate('Reminder', {name: 'Jane', work_period: this.state.work_period, break_period: this.state.break_period, sound: this.state.sound, btype: this.state.btype})}
            style = {styles.button}
            color = "#4444f0"
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
    height: '100%'
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
