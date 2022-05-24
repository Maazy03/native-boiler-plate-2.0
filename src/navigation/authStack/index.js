import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '@containers/authContainers/loginScreen';
import signupScreen from '@containers/authContainers/signupScreen';
import OnBoardingScreen from '@containers/authContainers/onBoardingScreen';
import {NavigationContainer} from '@react-navigation/native';

const AuthStack = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'OnBoard'}>
        <Stack.Screen name="OnBoard" component={OnBoardingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={signupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
