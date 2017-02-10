import * as gameStatuses from '../constants/statuses';

export let choices = {
    "1": {question: 'Что ты сделаешь?', answers: [
      {text:'возьмёшь трубку', choiceId:'2'},
      {text: 'не возьмёшь трубку', choiceId:'3'}
    ]},
    "2": {question: 'Кто ты?', answers: [
      {text:'Кит', choiceId:'', gameStatus:gameStatuses.GAME_OVER},
      {text:'Носорог', choiceId:'4'},
      {text:'Кот', choiceId:'3'}
    ]},
    "3": {question: 'В какую дверь войдёшь?', answers: [
      {text:'правую', choiceId:'4'},
      {text:'левую', choiceId:'5'}
    ]},
    "4": {question: 'Нажать кнопку?', answers: [
      {text:'Да', choiceId:'5'},
      {text:'Нет', choiceId:'', gameStatus:gameStatuses.GAME_OVER}
    ]},
    "5": {question: 'Выпить водицы из склянки?', answers: [
      {text:'Да', choiceId:'6'},
      {text:'Нет', choiceId:'7'}
    ]},
    "6": {question: 'Погладить крота?', answers: [
      {text:'Да', choiceId:'', gameStatus:gameStatuses.GAME_OVER},
      {text:'Нет', choiceId:'8'}
    ]},
    "7": {question: 'Выйти из комнаты?', answers: [
      {text:'да', choiceId:'8'},
      {text:'Нет', choiceId:'', gameStatus:gameStatuses.GAME_OVER}
    ]},
    "8": {question: 'Зарядить ноутбук?', answers: [
      {text:'Да', choiceId:'', gameStatus: gameStatuses.GAME_IS_WON},
      {text:'Нет', choiceId:'', gameStatus:gameStatuses.GAME_IS_WON}
    ]}
}