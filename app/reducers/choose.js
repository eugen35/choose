import * as types from '../actions/actionTypes';
import * as gameStatuses from '../constants/statuses';
import { choices } from '../data/choices';
import { NavigationExperimental } from 'react-native';
const {
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

const initialState = {
  count: 0,
  history: [{choiceId:'1'}], //Массив объектов {choiceId, answerNumber} - если answer undefined, то ответ не дан
  undid: false, //Если true, то ход уже отменяли, а дважды подряд отменять нельзя... Через ход, например, уже снова можно отменить
  gameStatus: gameStatuses.GAME_IS_PLAYED,

  navigationState: {
            index: 0, // Starts with first route focused.
            routes: [{key: '1'}], // Starts with only one route.
          }

};



export default function counter(state = initialState, action = {}) {
  let history
  let { navigationState } = state

  console.log('===========================')
  console.log(action.type)
  console.log('===========================')

  switch (action.type) {
    case types.NAV_PUSH:
        // Push a new route, which in our case is an object with a key value.
        // I am fond of cryptic keys (but seriously, keys should be unique)
        const route = {key: '2'};
        // Use the push reducer provided by NavigationStateUtils
        navigationState = NavigationStateUtils.push(navigationState, route);
        return {...state, navigationState} //@todo [ненужная нагрузка] Тут можно проверку добавить - менялся ли стэйт, если нет, то новый стэйт делать не нужно - так в официальном примере написано

    case types.NAV_POP:
      // Pop the current route using the pop reducer.
      navigationState = NavigationStateUtils.pop(navigationState);
      return {...state, navigationState} //@todo [ненужная нагрузка] Тут можно проверку добавить - менялся ли стэйт, если нет, то новый стэйт делать не нужно - так в официальном примере написано

    case types.NAV_PRESS:
      console.log('|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||')
      // Pop the current route using the pop reducer.
      if ( 1 == navigationState.routes.length ) {
        // Push a new route, which in our case is an object with a key value.
        // I am fond of cryptic keys (but seriously, keys should be unique)
        const route = {key: '2'};
        // Use the push reducer provided by NavigationStateUtils
        navigationState = NavigationStateUtils.push(navigationState, route);
      } else {
        // Pop the current route using the pop reducer.
        navigationState = NavigationStateUtils.pop(navigationState);
      }
      return {...state, navigationState} //@todo [ненужная нагрузка] Тут можно проверку добавить - менялся ли стэйт, если нет, то новый стэйт делать не нужно - так в официальном примере написано

    case types.CHOICE_IS_MADE:
          history = state.history //@todo [очень отдалённое][очень потенциальный баг][неожиданное поведение] По идеологии react нужно клонировать массив, а не передвать его по ссылке
          history[ history.length - 1 ].answerNumber = action.answerNumber //Дописываем сведения о выборе варианта ответа в последний элемент массива
          currentChoiceId = history[ history.length - 1 ].choiceId
          console.log('*************=====================================================')
          console.log(currentChoiceId)
          console.log(action.answerNumber)
          console.log(choices[ currentChoiceId ].answers[ action.answerNumber ].choiceId)
          console.log(JSON.stringify(history))
          console.log('*************=====================================================')
          choiceId = choices[ currentChoiceId ].answers[ action.answerNumber ].choiceId // choiceId, к которому привёл ответ на текущий вопрос
          if ('' === choiceId) { //Если меняется статус игры, то нового вопроса нет
            return {
              ...state,
              history, //Он уже другой, т.к. ответ-то в него всё равно записали уже
              gameStatus:  choices[currentChoiceId].answers[action.answerNumber].gameStatus,
              undid: false // Сбрасываем флаг предыдущией отмены
            };
          }
          history.push({choiceId}) //Перед записью добавляем сюда choiceId, к которому привёл ответ на текущий вопрос
          return {
                        ...state,
                        history,
                        undid: false // Сбрасываем флаг предыдущией отмены
          };



    case types.UNDO_CHOICE:
              console.log('*****')
              if (1 == state.history.length || state.undid) return state;
              history = state.history //@todo [очень отдалённое][очень потенциальный баг][неожиданное поведение] По идеологии react нужно клонировать массив, а не передвать его по ссылке
              //Нечего отменять или уже отменяли (а дважды подряд отменять нельзя)
              //history.pop() //Удалим текущий вопрос
              delete history[ history.length - 1 ].answerNumber //Удаляем выбранный ранее вариант ответа напредыдущий вопрос
              return {
                ...state,
                history,
                gameStatus: gameStatuses.GAME_IS_PLAYED, //Это на случай, если статус был поменян
                undid: true
              };
    case types.RESTART_PLAY:
      return { //@todo [дублирование кода][неожиданное поведение] initialState портится вовремя игры, т.к. массив передаётся по ссылке
               count: 0,
               history: [{choiceId:'1'}], //Массив объектов {choiceId, answerNumber} - если answer undefined, то ответ не дан
               undid: false, //Если true, то ход уже отменяли, а дважды подряд отменять нельзя... Через ход, например, уже снова можно отменить
               gameStatus: gameStatuses.GAME_IS_PLAYED
             };

    default:
      return state;
  }
}
