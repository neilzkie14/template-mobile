import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../app/views/screens/SplashScreen/SplashScreen';
import Login from '../app/views/screens/Login/Login';
import Home from '../app/views/screens/Home/Home';

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          // header: Header,
          // headerMode: 'screen',
          // mode: 'card', // 'modal'
        }}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            headerShown: false,
            gestureEnabled: false
          }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Login',
            headerShown: false,
            gestureEnabled: false
          }}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
            headerShown: false,
            gestureEnabled: false
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}