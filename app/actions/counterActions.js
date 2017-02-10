import * as types from './actionTypes';

export function increment() {
  return {
    type: types.INCREMENT
  };
}

export function decrement() {
  return {
    type: types.DECREMENT
  };
}



export function choiceIsMade(answerNumber) {
  return {
    type: types.CHOICE_IS_MADE,
    answerNumber
  };
}
export function undoChoice() {
  return {
    type: types.UNDO_CHOICE
  };
}