export let choices = {
    "1": {question: 'Что ты сделаешь?', answers: [
      {answer:'возьмёшь трубку', choiceId:'2'},
      {answer: 'возьмёшь трубку', choiceId:'3'}
    ]},
    "2": {question: 'Что ты сделаешь?', answers: [
      {answer:'возьмёшь трубку', choiceId:'', gameStatus:'game over'},
      {answer:'возьмёшь трубку', choiceId:'4'}
    ]},
    "3": {question: 'Что ты сделаешь?', answers: [
      {answer:'возьмёшь трубку', choiceId:'4'},
      {answer:'возьмёшь трубку', choiceId:'5'}
    ]},
    "4": {question: 'Что ты сделаешь?', answers: [
      {answer:'возьмёшь трубку', choiceId:'5'},
      {answer:'возьмёшь трубку', choiceId:'', gameStatus:'game over'}
    ]},
    "5": {question: 'Что ты сделаешь?', answers: [
      {answer:'возьмёшь трубку', choiceId:'6'},
      {answer:'возьмёшь трубку', choiceId:'7'}
    ]},
    "6": {question: 'Что ты сделаешь?', answers: [
      {answer:'возьмёшь трубку', choiceId:'', gameStatus:'game over'},
      {answer:'возьмёшь трубку', choiceId:'8'}
    ]},
    "7": {question: 'Что ты сделаешь?', answers: [
      {answer:'возьмёшь трубку', choiceId:'8'},
      {answer:'возьмёшь трубку', choiceId:'', gameStatus:'game over'}
    ]},
    "8": {question: 'Что ты сделаешь?', answers: [
      {answer:'возьмёшь трубку', choiceId:'', gameStatus: 'win'},
      {answer:'возьмёшь трубку', choiceId:'', gameStatus:'win'}
    ]}
}