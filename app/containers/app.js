import React, {Component} from 'react';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { persistStore } from 'redux-persist'
import { AsyncStorage } from 'react-native';


import * as reducers from '../reducers';
import CounterApp from './counterApp';

const reducer = combineReducers(reducers);

const store = createStore(reducer, undefined, applyMiddleware(thunk)); // Add the autoRehydrate middleware to your redux store

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
