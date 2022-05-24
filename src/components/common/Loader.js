import React from 'react';
import {View, StyleSheet, Dimensions, ActivityIndicator} from 'react-native';

const Loader = props => {
  return (
    <View
      style={[
        styles.container,
        props?.bgColor && {
          backgroundColor: props?.bgColor,
        },
      ]}>
      <ActivityIndicator size="large" color={'gray'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
});

export default Loader;
