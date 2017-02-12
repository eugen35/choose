'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import Choose from '../components/Choose';
import MyVerySimpleNavigator from '../components/MyVerySimpleNavigator';
import * as counterActions from '../actions/counterActions';
import { connect } from 'react-redux';

import * as gameStatuses from '../constants/statuses';
import { choices } from '../data/choices.js'


class CounterApp extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    console.log('=====================================================')
    console.log(JSON.stringify(state))
    console.log('=====================================================')
    const { question, answers } =  choices[ state.history[ state.history.length - 1 ].choiceId ] //{ question:'ВОПРОС'+JSON.stringify(state.history), answers:['ОТВЕТ1','ОТВЕТ2'] }
    return (
        <MyVerySimpleNavigator state = {state} {...actions}
            question = {question}
            answers = {answers}
            gameStatus = {state.gameStatus}
            undid = {state.undid}
            isContinuePossible = { ( undefined == state.rehydratedState && gameStatuses.GAME_IS_NOT_STARTED == state.gameStatus ) ? false : true }
        />
    );
  }

}

export default connect(state => ({
    state: state.choose
  }),
  (dispatch) => ({
    actions: bindActionCreators(counterActions, dispatch)
  })
)(CounterApp);
