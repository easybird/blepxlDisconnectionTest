/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import DeviceList from './DeviceList';
import {Platform, StyleSheet, Text, View} from 'react-native';

export default class App extends Component {
  state = {
    devices: {
      'mslkdfjd-jmsdifjmdsifj': {
        id: 'mslkdfjd-jmsdifjmdsifj',
        name: 'whatever',
        localName: 'whatever',
        status: false
      },
      '2': {
        id: '2',
        name: 'omg',
        localName: 'omg',
        status: false
      },
    },
  };

  handleConnectionChange = (id) => {
    this.setState({
      devices: {
        ...this.state.devices,
        [id]: {
          ...this.state.devices[id],
          status: !this.state.devices[id].status
        }
      }
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          All bluetooth devices!
        </Text>
        <DeviceList
          devices={Object.values(this.state.devices)}
          onConnectionChange={id => this.handleConnectionChange(id)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    paddingTop: 20,
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
