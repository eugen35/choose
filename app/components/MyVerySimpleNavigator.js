import {
  NavigationExperimental, PixelRatio, ScrollView, StyleSheet, Text, TouchableHighlight
} from 'react-native';

import React, { Component } from 'react';


import Scene1 from './Scene1'
import Scene2 from './Scene2'

const {
  CardStack: NavigationCardStack
} = NavigationExperimental;



export default class MyVerySimpleNavigator extends Component {

  // This sets up the methods (e.g. Pop, Push) for navigation.
  constructor(props, context) {
    super(props, context);

/*
    this._onPushRoute = this.props.onNavigationChange.bind(null, 'push');
    this._onPopRoute = this.props.onNavigationChange.bind(null, 'pop');
*/
    this._onPushRoute = this.props.onPushRoute.bind(null, 'push');
    this._onPopRoute = this.props.onPopRoute.bind(null, 'pop');

    this._renderScene = this._renderScene.bind(this);
  }

  // Now we finally get to use the `NavigationCardStack` to render the scenes.
  render() {
    const styles = this.props.styles
    const navigationState = this.props.navigationState
    let {onPushRoute, onPopRoute} = this.props
    return (
      <NavigationCardStack
        onNavigateBack={this.onPopRoute}
        navigationState={navigationState}
        renderScene={this._renderScene}
        style={styles.navigator}
      />
    );
  }

  // Render a scene for route.
  // The detailed spec of `sceneProps` is defined at `NavigationTypeDefinition`
  // as type `NavigationSceneRendererProps`.
  // Here you could choose to render a different component for each route, but
  // we'll keep it simple.
  _renderScene(sceneProps) {
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
    console.log('-------------------')
    console.log(sceneProps.scene.route.key)
    console.log('1'==sceneProps.scene.route.key)
    console.log('-------------------')
    if ('1'==sceneProps.scene.route.key) {
        return (<Scene1
                styles={styles}
                route={sceneProps.scene.route}
                onPushRoute={this._onPushRoute}
                onPopRoute={this._onPopRoute}
                onExit={this.props.onExit}
              />)
    }
    return (
      <Scene2
        styles={styles}
        route={sceneProps.scene.route}
        onPushRoute={this._onPushRoute}
        onPopRoute={this._onPopRoute}
        onExit={this.props.onExit}
      />
    );
  }
}