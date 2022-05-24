import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Dimensions, View} from 'react-native';
import navigationService from '../../navigationService';
import HomeScreen from '@containers/appContainers/homeScreen';
import Contact from '@containers/appContainers/contactScreen/Contactus';
import CustomDrawer from '@components/layout/customDrawer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EditProfile from '@containers/appContainers/profileModule/editProfile';
import Profile from '@containers/appContainers/profileModule/profile';

const AppStack = () => {
  const Drawer = createDrawerNavigator();
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const DrawerNavigator = () => {
    return (
      <Drawer.Navigator
        drawerPosition="right"
        drawerStyle={{
          backgroundColor: 'black',
        }}
        initialRouteName={'HomeScreen'}
        drawerContent={props => <CustomDrawer {...props} />}>
        <Drawer.Screen name="HomeScreen" component={HomeScreen} />
        <Drawer.Screen name="Contact" component={Contact} />
      </Drawer.Navigator>
    );
  };

  const BottomTabNavigator = () => {
    return (
      <Tab.Navigator
        initialRouteName={'Drawer'}
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: '#3B3C40',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            height: Dimensions.get('window').height * 0.1,
          },
        }}
        tabBarOptions={{
          showLabel: false,
          activeTintColor: 'white',
          inactiveTintColor: '#d9d9d9',
          style: {
            borderTopColor: '#66666666',
            backgroundColor: '#3B3C40',
            elevation: 0,
          },
        }}>
        <Tab.Screen
          name="BookClasses"
          component={Profile}
          options={{
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  backgroundColor: '#3B3C40',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 100,
                  width: 100,
                  borderRadius: 100,
                  elevation: 10,
                  shadowColor: '#0000009E',
                  borderWidth: 0.1,
                }}>
                <Ionicons
                  name="calendar-sharp"
                  color={'white'}
                  size={45}
                  style={{
                    marginBottom: 25,
                  }}
                />
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Drawer"
          component={DrawerNavigator}
          options={{
            tabBarButton: () => null,
          }}
        />
      </Tab.Navigator>
    );
  };

  const HomeStackNavigator = props => {
    return (
      <NavigationContainer ref={navigationService.navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName={'Tab'}>
          <Stack.Screen name="Tab" component={BottomTabNavigator} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  };

  return <HomeStackNavigator />;
};
export default AppStack;
