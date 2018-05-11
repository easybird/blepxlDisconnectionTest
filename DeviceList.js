import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList} from 'react-native';
import DeviceItem from './DeviceItem';

const styles = StyleSheet.create({
    separator: {
      height: 1,
      marginVertical: 10,
      backgroundColor: 'grey',
    },
  });

const DeviceList = ({devices, connectedDeviceId, onConnectionChange, onRefresh}) => {
  return (<FlatList
    data={devices}
    keyExtractor={device => device.id}
    renderItem={({item, index}) => (
      <DeviceItem device={item} onConnectionChange={onConnectionChange} isEnabled={!connectedDeviceId || connectedDeviceId === item.id}/>
    )}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={styles.flatlist}
    ItemSeparatorComponent={() => (
      <View style={[styles.separator]} />
    )}
    onRefresh={onRefresh}
    refreshing={false}
/>)
};

export default DeviceList;
