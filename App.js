/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import AppNavigator from './src/navigation/index';
import 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';
import store from './src/store/index';
import {persistStore} from 'redux-persist';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from 'react-native-flash-message';

import {Provider} from 'react-redux';

const App = () => {
  let persistor = persistStore(store);
  useEffect(() => {
    SplashScreen.hide();
  });

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
          <FlashMessage position="top" />
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
