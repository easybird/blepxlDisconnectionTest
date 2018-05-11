import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create ({
  device: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10
  },
  text: {
    fontSize: 20,
    margin: 10,
  },
  button: {
    backgroundColor: 'green',
    borderRadius: 20,
  },
});

const DeviceItem = ({device, onConnectionChange}) => {
  return (
    <View style={styles.device}>
      <Text style={styles.text}>{'id: ' + device.id}</Text>
      <Text style={styles.text}>{'name: ' + device.name}</Text>
      <Text style={styles.text}>{'localName: ' + device.localName}</Text>
      <TouchableHighlight onPress={() => onConnectionChange(device.id)}>
        <View style={styles.button}>
          <Text style={styles.text}>{device.status ? 'Connected' : 'Not Connected'}</Text>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default DeviceItem;
