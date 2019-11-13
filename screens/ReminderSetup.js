import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Picker, TextInput } from 'react-native';
export default class ProfileScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {btype: "exercise", work_period: (30).toString(), break_period: (1).toString()};
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
    title: 'Welcome',
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <Text style = {styles.work_period}>
          Work Period Length (minutes):
        </Text>
        <TextInput
          style={styles.type_box}
          onChangeText={text => this.onChangeWorkingPeriod(text)}
          value={this.state.work_period}>
        </TextInput>
        <Text style = {styles.work_period}>
          Break Length (minutes):
        </Text>
        <TextInput
          style={ styles.type_box  }
          onChangeText={text => this.onChangeBreakPeriod(text)}
          value={this.state.break_period}>
        </TextInput>
        <Text style = {styles.work_period}>
          Break Type:
        </Text>
        <Picker
          selectedValue={this.state.btype}
          style={{height: 50, width: 100, left: 30, }}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({btype: itemValue})
          }>
          <Picker.Item label="Exercise" value="exercise" />
          <Picker.Item label="Stretch" value="strech" />
          <Picker.Item label="Free Time" value="free_time" />
        </Picker>
        <Button
        title="Set Reminder"
        onPress={() => navigate('Reminder', {name: 'Jane'})}
        style = {styles.button}
      />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  work_period: {
    margin: 5,
    fontSize: 16,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  type_box: {
     height: 40,
     borderColor: 'gray',
     borderWidth: 1,
     width:150,
     left: 30,
     marginBottom: 20
  },
  button: {
    textAlign: 'center',
    color: '#333333',
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 50,
    top: 50,
  },
});
