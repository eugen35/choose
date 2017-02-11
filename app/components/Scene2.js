import {
  NavigationExperimental, PixelRatio, ScrollView, StyleSheet, Text, TouchableHighlight, View
} from 'react-native';

import React, { Component } from 'react';



class TappableRow extends Component {
  render() {
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
    return (
      <TouchableHighlight
        style={styles.row}
        underlayColor="#D0D0D0"
        onPress={this.props.onPress}>
        <Text style={styles.buttonText}>
          {this.props.text}
        </Text>
      </TouchableHighlight>
    );
  }
}

export default class Scene1 extends Component {
  render() {
    const styles = this.props.styles
    return (
      <ScrollView style={styles.scrollView}>
        <TouchableHighlight onPress={this.props.onPressRoute}>
                    <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        </TouchableHighlight>
        <Text style={styles.row}>
          --------------СЦЕНА 2
          Route: {this.props.route.key}
        </Text>
        <TappableRow
          text="Tap me to load the next scene"
          onPress={this.props.onPushRoute}
        />
        <TappableRow
          text="Tap me to go back"
          onPress={this.props.onPopRoute}
        />
      </ScrollView>
    );
  }
}