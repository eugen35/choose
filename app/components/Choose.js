import React, { Component } from 'react';
import { Text, View, TouchableHighlight, StyleSheet } from 'react-native';

import * as gameStatuses from '../constants/statuses';

const styles = StyleSheet.create({
  button: {
    height: 40,
    padding: 10,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3
  }
});

export default class Choose extends Component {

  constructor(props) {
      super(props);
  }

  render() {
    const { question, answers, gameStatus, undid, answerNumber, choiceIsMade, undoChoice, restartGame } = this.props.propsAll;
    switch (gameStatus){
      case gameStatuses.GAME_OVER:
        return (
          <View>
            <TouchableHighlight onPress={this.props.onPressRoute}>
                        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
                    </TouchableHighlight>
            <Text>GAME OVER!!!</Text>
            <TouchableHighlight onPress={ undoChoice } style={styles.button}>
              <Text>ОТМЕНИТЬ ПОСЛЕДНИЙ ВЫБОР</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={ restartGame } style={styles.button}>
              <Text>Играть сначала</Text>
            </TouchableHighlight>
          </View>

        );
      case gameStatuses.GAME_IS_WON:
        return (
          <View>
            <TouchableHighlight onPress={this.props.onPressRoute}>
                        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
                    </TouchableHighlight>
            <Text>YOU ARE WON!!!</Text>
            <TouchableHighlight onPress={ restartGame } style={styles.button}>
                <Text>Играть сначала</Text>
            </TouchableHighlight>
          </View>
        );
      default:
        const answersItems = answers.map( (answer, index) =>
                              <TouchableHighlight key = {index} onPress={ () => choiceIsMade (index) } style={styles.button}>
                                  <Text>{answer.text}</Text>
                              </TouchableHighlight>
                         )
        return (
                <View>
                    <TouchableHighlight onPress={this.props.onPressRoute}>
                        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
                    </TouchableHighlight>
                    <Text style={{ fontSize: 23 }}>{question}</Text>
                    { answerNumber != undefined ? <Text>{answers[answerNumber].text}</Text> : answersItems }
                </View>
            );
    }
  }
}