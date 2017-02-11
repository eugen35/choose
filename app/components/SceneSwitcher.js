import {
  NavigationExperimental, PixelRatio, ScrollView, StyleSheet, Text, TouchableHighlight
} from 'react-native';

import React, { Component } from 'react';
import {
  AppRegistry,
  View
} from 'react-native';

import MyVerySimpleNavigator from './MyVerySimpleNavigator'

const {
  CardStack: NavigationCardStack,
  StateUtils: NavigationStateUtils,
} = NavigationExperimental;


export default class SceneSwitcher extends Component {

  constructor(props, context) {
      super(props, context);

      this.state = {
        // This defines the initial navigation state.
        navigationState: {
          index: 0, // Starts with first route focused.
          routes: [{key: '1'}], // Starts with only one route.
        },
      };

      // We'll define this function later - hang on
      this._onNavigationChange = this._onNavigationChange.bind(this);
    }

      _onNavigationChange(type) {
        // Extract the navigationState from the current state:
        let {navigationState} = this.state;

        switch (type) {
          case 'push':
            // Push a new route, which in our case is an object with a key value.
            // I am fond of cryptic keys (but seriously, keys should be unique)
            const route = {key: '2'};

            // Use the push reducer provided by NavigationStateUtils
            navigationState = NavigationStateUtils.push(navigationState, route);
            break;

          case 'pop':
            // Pop the current route using the pop reducer.
            navigationState = NavigationStateUtils.pop(navigationState);
            break;
        }

        // NavigationStateUtils gives you back the same `navigationState` if nothing
        // has changed. We will only update state if it has changed.
        if (this.state.navigationState !== navigationState) {
          // Always use setState() when setting a new state!
          this.setState({navigationState});
          // If you are new to ES6, the above is equivalent to:
          // this.setState({navigationState: navigationState});
        }
      }


  render() {
    return (
      <MyVerySimpleNavigator
        styles={styles}
        navigationState={this.state.navigationState}
        onNavigationChange={this._onNavigationChange}
        onExit={this._exit}
      />
    );
  }
}

const styles = StyleSheet.create({
  navigator: {
    flex: 1,
  },
  scrollView: {
    marginTop: 64
  },
  row: {
    padding: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1 / PixelRatio.get(),
    borderBottomColor: '#CDCDCD',
  },
  rowText: {
    fontSize: 17,
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '500',
  },
});
