import React, {useEffect, useState} from 'react';
import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SubHeaderComponent from '../subHeader';
import HeaderComponent from './HeaderComponent';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default function ScreenBoiler(props) {
  const {navigation, children, headerProps} = props;
  const {isHeader, isSubHeader} = headerProps;

  return (
    <SafeAreaView style={styles.background}>
      <StatusBar style={{flex: 0}} barStyle={'light-content'} />

      {isHeader && <HeaderComponent navigation={navigation} />}
      {isSubHeader && (
        <SubHeaderComponent navigation={navigation} headerProps={headerProps} />
      )}
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: width,
    // height: height,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  main: {
    fontSize: 25,
    color: 'white',
  },
});
