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
export function reStartPlay() {
  return {
    type: types.RESTART_PLAY
  };
}


export function onPushRoute() {
  return {
    type: types.NAV_PUSH
  };
}
export function onPopRoute() {
  return {
    type: types.NAV_POP
  };
}
export function onPressRoute() {
  return {
    type: types.NAV_PRESS
  };
}