import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableHighlight} from 'react-native';

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 30,
    padding: 10,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 3
  }
});

export default class LeftSideBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { restartGame, resumeGame } = this.props.propsAll;

    return (
      <View >
        <TouchableHighlight onPress={this.props.onPressRoute}>
            <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        </TouchableHighlight>

        <TouchableHighlight onPress={resumeGame} style={styles.button}>
          <Text>Continue</Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={restartGame} style={styles.button}>
          <Text>New game</Text>
        </TouchableHighlight>
      </View>
    );
  }
}