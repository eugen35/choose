import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

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
    const { reStartPlay, resumeGame } = this.props;

    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>МЕНЮ</Text>
        <TouchableOpacity onPress={reStartPlay} style={styles.button}>
          <Text>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={resumeGame} style={styles.button}>
          <Text>New game</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={reStartPlay} style={styles.button}>
          <Text>Exit</Text>
        </TouchableOpacity>
      </View>
    );
  }
}