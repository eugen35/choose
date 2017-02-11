import {
  NavigationExperimental, PixelRatio, ScrollView, StyleSheet, Text, TouchableHighlight
} from 'react-native';

import React, { Component } from 'react';


import LeftSideBar from './LeftSideBar'
import Choose from './Choose'

const {
  CardStack: NavigationCardStack
} = NavigationExperimental;



export default class MyVerySimpleNavigator extends Component {

  // This sets up the methods (e.g. Pop, Push) for navigation.
  constructor(props, context) {
    super(props, context);

    this._onPressRoute = this.props.onPressRoute.bind(null, 'press');

    this._renderScene = this._renderScene.bind(this);
  }

  // Now we finally get to use the `NavigationCardStack` to render the scenes.
  render() {

    const navigationState = this.props.state.navigationState
    let {onPushRoute, onPopRoute} = this.props
    return (
      <NavigationCardStack
        navigationState={navigationState}
        renderScene={this._renderScene}
      />
    );
  }

  // Render a scene for route.
  // The detailed spec of `sceneProps` is defined at `NavigationTypeDefinition`
  // as type `NavigationSceneRendererProps`.
  // Here you could choose to render a different component for each route, but
  // we'll keep it simple.
  _renderScene(sceneProps) {
    console.log('-------------------')
    console.log(sceneProps.scene.route.key)
    console.log('1'==sceneProps.scene.route.key)
    console.log('-------------------')
    if ('1'==sceneProps.scene.route.key) {
        return (<LeftSideBar
                onPressRoute={this._onPressRoute}
                propsAll={this.props}
              />)
    }
    return (
      <Choose
        onPressRoute={this._onPressRoute}
        propsAll={this.props}
      />
    );
  }
}