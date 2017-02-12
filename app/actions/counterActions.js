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
export function restartGame() {
  return {
    type: types.RESTART_GAME
  };
}
export function resumeGame() {
  return {
    type: types.RESUME_GAME
  };
}


export function onPressRoute() {
  return {
    type: types.NAV_PRESS
  };
}