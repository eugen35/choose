import * as types from './actionTypes';

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


export function onPressRoute() {
  return {
    type: types.NAV_PRESS
  };
}