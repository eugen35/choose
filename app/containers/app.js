import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { persistStore, autoRehydrate } from 'redux-persist'
import { AsyncStorage } from 'react-native';


import * as reducers from '../reducers';
import CounterApp from './counterApp';

const reducer = combineReducers(reducers);


//const store = createStore(reducer, undefined, compose(applyMiddleware(thunk), autoRehydrate()));
//вроде правильно, как ниже, а не как выше: см. раздел tips http://redux.js.org/docs/api/applyMiddleware.html
const store = createStore(reducer, undefined, autoRehydrate(), applyMiddleware(thunk)); // Add the autoRehydrate middleware to your redux store

// Enable persistence and choice AsyncStorage
persistStore(store, {storage: AsyncStorage})

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <CounterApp />
      </Provider>
    );
  }
}
