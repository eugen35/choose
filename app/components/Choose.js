import React, { Component } from 'react';
import { Text, View, TouchableHighlight } from 'react-native';

import * as gameStatuses from '../constants/statuses';

export default class Choose extends Component {

  constructor(props) {
      super(props);
  }

  render() {
    const { question, answers, gameStatus, undid, answerNumber, choiceIsMade, undoChoice, reStartPlay } = this.props;
    switch (gameStatus){
      case gameStatuses.GAME_OVER:
        return (
          <View>
            <Text>GAME OVER!!!</Text>
            <TouchableHighlight onPress={ undoChoice }>
              <Text>ОТМЕНИТЬ ПОСЛЕДНИЙ ВЫБОР</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={ reStartPlay }>
              <Text>Играть сначала</Text>
            </TouchableHighlight>
          </View>

        );
      case gameStatuses.GAME_IS_WON:
        return (
          <View>
            <Text>YOU ARE WON!!!</Text>
            <TouchableHighlight onPress={ reStartPlay }>
                <Text>Играть сначала</Text>
            </TouchableHighlight>
          </View>
        );
      default:
        const answersItems = this.props.answers.map( (answer, index) =>
                              <TouchableHighlight key = {index} onPress={ () => choiceIsMade (index) }>
                                  <Text>{answer.text}</Text>
                              </TouchableHighlight>
                         )
        return (
                <View>
                    <Text>{this.props.question}</Text>
                    { answerNumber != undefined ? <Text>{answers[answerNumber].text}</Text> : answersItems }
                </View>
            );
    }
  }
}