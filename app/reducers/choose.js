import * as types from '../actions/actionTypes';
import * as gameStatuses from '../constants/statuses';
import { choices } from '../data/choices';
import { NavigationExperimental } from 'react-native';
import {REHYDRATE} from 'redux-persist/constants';

const {
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;

//Создаём функцию для того, чтобы генерировать начальное состояние. Чтобы работал редьюсер restartGame
//Если бы мы начальное состояние хранили в переменной, то по ходу приложения оно бы менялось, так как массивы и прочее передаются по ссылке
const getInitialState = () => ({
   count: 0,
   history: [{choiceId:'1'}], //Массив объектов {choiceId, answerNumber} - если answer undefined, то ответ не дан
   undid: false, //Если true, то ход уже отменяли, а дважды подряд отменять нельзя... Через ход, например, уже снова можно отменить
   gameStatus: gameStatuses.GAME_IS_PLAYED,
   navigationState: {
       index: 0, // Starts with first route focused.
       routes: [{key: '1'}] // Starts with only one route.
   },
   rehydratedState: undefined
});
let restartedGameState;

export default function counter(state = getInitialState(), action = {}) {
  let history
  let { navigationState } = state
 console.log('-----------------------------------------------------------------')
    console.log(action.type)
    console.log('-----------------------------------------------------------------')

  switch (action.type) {

    case REHYDRATE: //После регидратации возникает это действие, в payload - регидратированное состояние.
      //Если обрабатываю в редьюсере это действие, то почему-то автоматически в стэйт payload уже не грузитсяю
      //И я могу здесь его отправить в стейт самостоятельно, если захочу
      console.log('[[[[[[[[[[[[[[[[[[[[[[[[[[[[[')
      console.log(JSON.stringify({ ...state, rehydratedState: action.payload.choose }))
      console.log('[[[[[[[[[[[[[[[[[[[[[[[[[[[[[')
      return { ...state, rehydratedState: action.payload.choose }

    case types.NAV_PRESS:

      // Pop the current route using the pop reducer.
      if ( 1 == navigationState.routes.length ) {
        // @todo [правильность использования библиотеки] [очень отдалённо] а ведь в течение работы app этот роут у нас есть. зачем его снова создавать? или нет его? ведь мы попим его когда уходим с него? а зачем мы попим его?
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

    case types.RESTART_GAME:
      restartedGameState = getInitialState(); //При этом rehydratedState затирается
      restartedGameState.navigationState = {
         index: 1, // Starts with two route focused.
         routes: [{key: '1'}, {key: '2'}] // Starts with only one route.
      }
      return restartedGameState;


    case types.RESUME_GAME:
      console.log('|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||')
      console.log(JSON.stringify({... (state.rehydratedState) }))
      console.log(JSON.stringify({ ...state, navigationState }))
      console.log('|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||')
      //Если это континуе после регидратации, то подгружаем сохранённый стэйт. При этом данные о регидратация удаляем
      if (undefined !== state.rehydratedState) return {... (state.rehydratedState), rehydratedState: undefined }
      //Иначе(так как регидрированных данных нет) - просто переходим обратно к игре
      navigationState = NavigationStateUtils.push(navigationState, {key: '2'});
      return { ...state, navigationState };

    default:
      return state;
  }
}

