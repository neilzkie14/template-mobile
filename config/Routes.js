import React from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SplashScreen from '../app/views/screens/SplashScreen/SplashScreen';
import Login from '../app/views/screens/Login/Login';
import Home from '../app/views/screens/Home/Home';
import Lms from '../app/views/screens/Lms/LmsScreen';
import Ontraq from '../app/views/screens/Ontraq/OntraqScreen';
import Settings from '../app/views/screens/Settings/Settings';
import AddStudent from '../app/views/screens/AddStudent/AddStudent';
import ChildInformation from '../app/views/screens/Settings/components/ChildInformation';
import UserInformation from '../app/views/screens/Settings/components/UserInformation';
import SecuritySettings from '../app/views/screens/Settings/components/SecuritySettings';
import PasswordScreen from '../app/views/screens/Settings/components/PasswordScreen';
import Index from '../app/views/screens/Ontraq/Index';
import OntraqInOutScreen from '../app/views/screens/Ontraq/components/OntraqInOutScreen.';
import Osiris from '../app/views/screens/Osiris/Osiris';
const {width} = Dimensions.get('screen');

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const homeName = 'Announcements';
const LmsName = 'LMS';
const OntraqName = 'OntraQ';
const settings = 'Settings';
const osiris = 'Osiris'
const megaphone = require('../app/images/megaphone-green.png');
const book = require('../app/images/book-green.png');
const step = require('../app/images/steps-green.png');
const settings_icon = require('../app/images/settings2.png');
const osiris_icon = require('../app/images/osiris-icon.png');

const MyTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#A3D063',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingVertical: 5,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          backgroundColor: 'white',
          position: 'absolute',
          height: 60,
        },
        tabBarLabelStyle: {paddingBottom: 3},
      })}>
      <Tab.Screen
        name={homeName}
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({size, focused, color}) => {
            return (
              <Image
                resizeMode="contain"
                style={{
                  width: width / 15,
                  height: width / 15,
                  tintColor: focused ? '#A3D063' : 'gray',
                }}
                source={megaphone}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={LmsName}
        component={Lms}
        options={{
          headerShown: false,
          tabBarIcon: ({size, focused, color}) => {
            return (
              <Image
                resizeMode="contain"
                style={{
                  width: width / 15,
                  height: width / 15,
                  tintColor: focused ? '#A3D063' : 'gray',
                }}
                source={book}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={OntraqName}
        component={Index}
        options={{
          headerShown: false,
          tabBarIcon: ({size, focused, color}) => {
            return (
              <Image
                resizeMode="contain"
                style={{
                  width: width / 15,
                  height: width / 15,
                  tintColor: focused ? '#A3D063' : 'gray',
                }}
                source={step}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={osiris}
        component={Osiris}
        options={{
          headerShown: false,
          tabBarIcon: ({size, focused, color}) => {
            return (
              <Image
                resizeMode="contain"
                style={{
                  width: width / 15,
                  height: width / 15,
                  tintColor: focused ? '#A3D063' : 'gray',
                }}
                source={osiris_icon}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name={settings}
        component={Settings}
        options={{
          headerShown: false,
          tabBarIcon: ({size, focused, color}) => {
            return (
              <Image
                resizeMode="contain"
                style={{
                  width: width / 15,
                  height: width / 15,
                  tintColor: focused ? '#A3D063' : 'gray',
                }}
                source={settings_icon}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Login',
            headerShown: false,
            gestureEnabled: false,
          }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={MyTabs}
          options={{
            title: 'Dashboard',
            headerShown: false,
            gestureEnabled: false,
          }}
        />
         <Stack.Screen
          name="AddStudent"
          component={AddStudent}
          options={{
            title: 'AddStudent',
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
         name="ChildInformation"
         component={ChildInformation}
         options={{
           title: 'ChildInformation',
           headerShown: false,
           gestureEnabled: false,
         }}
       />
        <Stack.Screen
         name="UserInformation"
         component={UserInformation}
         options={{
           title: 'UserInformation',
           headerShown: false,
           gestureEnabled: false,
         }}
       />
        <Stack.Screen
          name="SecuritySettings"
          component={SecuritySettings}
          options={{
            title: 'SecuritySettings',
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
        name="PasswordScreen"
        component={PasswordScreen}
        options={{
          title: 'PasswordScreen',
          headerShown: false,
          gestureEnabled: false,
        }}
      />
        <Stack.Screen
          name="OntraqInOutScreen"
          component={OntraqInOutScreen}
          options={{
            title: 'OntraqInOutScreen',
            headerShown: false,
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
