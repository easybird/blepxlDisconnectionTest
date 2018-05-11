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

const DeviceList = ({devices, onConnectionChange}) => {
    console.log(devices);
  return (<FlatList
    data={devices}
    keyExtractor={device => device.id}
    renderItem={({item, index}) => (
      <DeviceItem device={item} onConnectionChange={onConnectionChange} />
    )}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={styles.flatlist}
    ItemSeparatorComponent={() => (
      <View style={[styles.separator]} />
    )}
/>)
};

export default DeviceList;
