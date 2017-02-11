import {
  NavigationExperimental, PixelRatio, ScrollView, StyleSheet, Text, TouchableHighlight
} from 'react-native';

import React, { Component } from 'react';
import {
  AppRegistry,
  View
} from 'react-native';

import MyVerySimpleNavigator from './MyVerySimpleNavigator'


export default class SceneSwitcher extends Component {

  constructor(props, context) {
      super(props, context);
    }




  render() {
    let navigationState=this.props.state.navigationState
    let {onPushRoute, onPopRoute} = this.props
    return (
      <MyVerySimpleNavigator
        styles={styles}
        navigationState={navigationState}
        onPushRoute = {onPushRoute}
        onPopRoute = {onPopRoute}
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
