import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class StyleableButton extends React.Component {


    constructor(props){
        super(props);
        
    }
    render(){
        return(
            <TouchableOpacity onPress={this.props.onPress} style={this.props.style}>
                <Text style={this.props.textStyle}>{this.props.title.toUpperCase()}</Text>
            </TouchableOpacity>
        )
        
    }
}