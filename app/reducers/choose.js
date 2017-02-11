import * as types from '../actions/actionTypes';
import * as gameStatuses from '../constants/statuses';
import { choices } from '../data/choices';

const initialState = {
  count: 0,
  history: [{choiceId:'1'}], //Массив объектов {choiceId, answerNumber} - если answer undefined, то ответ не дан
  undid: false, //Если true, то ход уже отменяли, а дважды подряд отменять нельзя... Через ход, например, уже снова можно отменить
  gameStatus: gameStatuses.GAME_IS_PLAYED,

  navigationState: {
          index: 0, // Starts with first route focused.
          routes: [{key: 'My Initial Scene'}], // Starts with only one route.
        }

};



export default function counter(state = initialState, action = {}) {
  let history

  switch (action.type) {
    case types.INCREMENT:
      return {
        ...state,
        count: state.count + 1
      };
    case types.DECREMENT:
      return {
        ...state,
        count: state.count - 1
      };

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
