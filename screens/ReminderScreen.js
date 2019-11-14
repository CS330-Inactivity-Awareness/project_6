import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
export default class ReminderScreen extends React.Component {
  
  constructor(props){
    super(props);
    this.state = {time_left: props.navigation.state.params.work_period * 60, full_time: props.navigation.state.params.work_period * 60}
    this.subtract_one = this.subtract_one.bind(this);
  }
  static navigationOptions = {
    headerLeft: null
  };

  componentDidMount(){
    setInterval(this.subtract_one, 1000)
  }

  subtract_one(){
    time_left = this.state.time_left - 1;
    this.setState({time_left: time_left});
  }

  seconds_to_hms(seconds){
    m_remain = seconds % 3600;
    s = m_remain % 60;
    return Math.floor(seconds / 3600).toString().padStart(2, "0") + ":" + Math.floor(m_remain / 60).toString().padStart(2, "0") + ":" + s.toString().padStart(2, "0");  
    
  }

  render() {
    const {navigate} = this.props.navigation;
    const { navigation } = this.props;
    return (
      <View>
        <Text>
          {this.seconds_to_hms(this.state.time_left)}
        </Text>
        <Button
          title="Cancel Reminder"
          onPress={() => navigate('Home', {name: 'Jane'})}
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
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});