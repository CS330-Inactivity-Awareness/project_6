import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button, Image } from 'react-native';
import { Audio } from 'expo-av';
import StyleableButton from '../StyleableButton'

export default class ReminderScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      time_left: props.navigation.state.params.work_period * 60,
      full_time: props.navigation.state.params.work_period * 60,
      full_break: props.navigation.state.params.break_period * 60,
      work_mode: true,
      sound: props.navigation.state.params.sound,
      break_type: props.navigation.state.params.btype,
    }
    this.subtract_one = this.subtract_one.bind(this);
    this.appState = props.navigation.state.params.state;
  }
  static navigationOptions = {
    headerLeft: null
  };

  async componentWillMount() {
    this.subtractor = setInterval(this.subtract_one, 1000);
    this.backgroundMusic = new Audio.Sound();
    this.bell = new Audio.Sound();
    try {
      await this.bell.loadAsync(
        require("../sounds/bell.wav")
      );
    } catch(e){
      1+1;
    }
    this.buzzer = new Audio.Sound();
    try {
      await this.buzzer.loadAsync(
        require("../sounds/buzzer.mp3")
      );
    } catch(e){
      1+1;
    }
    this.dream = new Audio.Sound();
    try {
      await this.dream.loadAsync(
        require("../sounds/dream.mp3")
      );
    } catch(e){
      1+1;
    }
    this.sound_players = {"bell": this.bell, "buzzer": this.buzzer, 'dream': this.dream}
  }



  componentWillUnmount(){
    clearInterval(this.subtractor);
  }

  title_text(mode){
    if (mode == true){
       return "Work Time!"
   }
    else if (this.state.break_type == "exercise" ) {
      return "Do 10 Shoulder Rolls";
     }
    else if (this.state.break_type == "free_time") {
      return "Free Time!";
   }
    else if (this.state.break_type == "stretch") {
      return "Stretch Your Legs";
  }
  else if (this.state.break_type == "stand_up") {
    return "Stand Up";
}
 }

 display_image(curr_mode){
  if (curr_mode == true){
     return (require("../images/work_time.png"))
   }
  else if (this.state.break_type == "exercise" ) {
    return (require("../images/shoulder_roll.jpg"))
   }
  else if (this.state.break_type == "free_time") {
    return (require("../images/free_time.png"))
  }
  else if (this.state.break_type == "stretch") {
    return (require("../images/leg_stretch.jpg"))
  }
  else if (this.state.break_type == "stand_up") {
    return (require("../images/stand_up.png"))
  }
}

  subtract_one(){
    if (this.state.time_left == 1){
	    this.sound_players[this.state.sound].replayAsync();
    }
    if (this.state.time_left == 0){
      if (this.state.work_mode == true){
        this.setState({time_left: this.state.full_break, work_mode: false});
      }
      else{
        this.setState({time_left: this.state.full_time, work_mode: true});
      }
    }
    else{
      time_left = this.state.time_left - 1;
      this.setState({time_left: time_left});
    }

  }

  seconds_to_hms(seconds){
    m_remain = seconds % 3600;
    s = m_remain % 60;
    return Math.floor(seconds / 3600).toString().padStart(2, "0") + ":" + Math.floor(m_remain / 60).toString().padStart(2, "0") + ":" + s.toString().padStart(2, "0");

  }

  static navigationOptions = {
    title: 'Reminder',
    headerStyle: {
      backgroundColor: '#4444f0',

    },
    headerTintColor: '#fff'
  };

  render() {
    const {navigate} = this.props.navigation;
    const { navigation } = this.props;
    return (
      <View style = {styles.container}>
	       <Text style = {styles.welcome}>
	         {this.title_text(this.state.work_mode)}
	       </Text>
         <Image
            style = {styles.imageStyle}
            source = {this.display_image(this.state.work_mode)}
         />

        <Text style = {styles.countdown}>
          {this.seconds_to_hms(this.state.time_left)}
        </Text>
        <StyleableButton
          title="Cancel Reminder"
          onPress={() => navigate('Home', {name: 'Jane'})}
          style = {styles.button}
          color = "#4444f0"
          textStyle = {styles.buttonText}
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
    padding: '3%'
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
  },
  countdown: {
    fontSize: 50,
    textAlign: 'center',

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

  countdown: {
    fontSize: 50,
    textAlign: 'center',

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
  }
});
