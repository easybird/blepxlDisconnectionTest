/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import DeviceList from './DeviceList';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {BleManager} from 'react-native-ble-plx';

export default class App extends Component {
  constructor (props) {
    super (props);
    this.manager = new BleManager ();
  }

  state = {
    devices: {},
  };

  scanAndConnect = () => {
    console.log ('scan and connect!');
    this.manager.startDeviceScan (null, null, (error, device) => {
      if (error) {
        // Handle error (scanning will be stopped automatically)
        return;
      }

      // Check if it is a device you are looking for based on advertisement data
      // or other criteria.

      if (device) {
        if (!this.state.devices[device.id]) {
          this.setState (({devices}) => ({
            devices: {
              ...devices,
              [device.id]: {
                id: device.id,
                name: device.name,
                localName: device.localName,
                deviceInstance: device,
              },
            },
          }));
        }
      }
    });
  };

  handleRefresh = () => {
    this.manager.stopDeviceScan ();
    this.clearDevicesAndStartScanning();
  };

  clearDevicesAndStartScanning = () => this.setState (
    () => ({devices: {}, connectedDeviceId: null}),
    () => {
      this.scanAndConnect ();
    }
  );

  componentWillMount () {
    this.subscription = this.manager.onStateChange (state => {
      switch (state) {
        case 'PoweredOn':
          this.scanAndConnect ();
          break;
        default:
          console.log ('stateChange: ' + state);
          break;
      }
    }, true);
  }

  componentWillUnmount () {
    this.subscription && this.subscription.remove ();
  }

  handleConnect = device => {
    this.manager.stopDeviceScan ();
    device.deviceInstance.connect ().then ((connectedDevice) => {
      this.deviceListener = connectedDevice.onDisconnected(() => {
        console.log('onDeviceDisconnected listener')
        this.onDisconnectRefresh();
      });
      this.setState (({devices}) => ({
        connectedDeviceId: device.id,
        devices: {
          ...devices,
          [device.id]: {
            ...device,
            status: !device.status,
          },
        },
      }));
    });
  };

  handleDisconnect = device => {
    device.deviceInstance.cancelConnection().then(() => {
      console.log('connection closed');
    });
  }

  onDisconnectRefresh = _ => {
    this.deviceListener = null;
    this.clearDevicesAndStartScanning();
  }

  handleConnectionChange = id => {
    const device = this.state.devices[id];
    const deviceInstance = device && device.deviceInstance;

    if (!deviceInstance) {
      throw new Error ('device instance not found with id: ' + id);
    }

    if (!device.status) {
      this.handleConnect (device);
    } else {
      this.handleDisconnect (device);
    }
  };

  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          All bluetooth devices!
        </Text>
        <DeviceList
          devices={Object.values (this.state.devices)}
          connectedDeviceId={this.state.connectedDeviceId}
          onConnectionChange={id => this.handleConnectionChange (id)}
          onRefresh={this.handleRefresh}
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
