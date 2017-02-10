import * as types from '../actions/actionTypes';
import * as types from '../constants/statuses';


const initialState = {
  count: 0,
  history: [],
  undid: false //Если true, то ход уже отменяли, а дважды подряд отменять нельзя... Через ход, например, уже снова можно отменить
  status:
};

export default function counter(state = initialState, action = {}) {
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
          return {
            ...state,
            history: state.history.push()
            undid: false // Сбрасываем флаг предыдущией отмены
          };
    case types.UNDO_CHOICE:
              //Нечего отменять или уже отменяли (а дважды подряд отменять нельзя)
              if (0 == state.history.length || state.undid) return state;
              return {
                ...state,
                history: state.history.pop()
                undid: true
              };

    default:
      return state;
  }
}
