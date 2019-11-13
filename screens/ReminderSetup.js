import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Picker, TextInput } from 'react-native';
export default class ProfileScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {btype: "exercise", work_period: (1).toString(), break_period: (1).toString()};
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
        <Text>
          Work Period Length (minutes)
        </Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.onChangeWorkingPeriod(text)}
          value={this.state.work_period}>
        </TextInput>
        <Text>
          Break Length (minutes)
        </Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={text => this.onChangeBreakPeriod(text)}
          value={this.state.break_period}>
        </TextInput>
        <Text>
          Break Type
        </Text>
        <Picker
          selectedValue={this.state.btype}
          style={{height: 50, width: 100}}
          onValueChange={(itemValue, itemIndex) =>
            this.setState({btype: itemValue})
          }>
          <Picker.Item label="Exercise" value="exercise" />
          <Picker.Item label="Free Time" value="free_time" />
        </Picker>
        <Button
        title="Set Reminder"
        onPress={() => navigate('Reminder', {name: 'Jane', work_period: this.state.work_period})}
      />
      </View>
    );
  }
}