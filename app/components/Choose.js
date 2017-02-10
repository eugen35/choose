import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';
import { choices } from './data/choices.js'

export default class Choose extends Component {

  constructor(props) {
      super(props);
      this.state = {chosen: undefined};
      this.handleChange = this.handleChange.bind(this);
  }

  handleChange (answer) {
    this.setState({chosen: answer});
  }

  render() {
    const answersItems = this.props.answers.map( (answer, index) =>
         <TouchableHighlight key = {index} onPress={ ()=>{this.handleChange (answer)} }>
             <Text >{answer}</Text>
         </TouchableHighlight>
    )
    return (
        <View>
            <Text>{this.props.question}</Text>
            {this.state.chosen != undefined ? <Text>{this.state.chosen}</Text> : answersItems }
        </View>
    );
  }
}