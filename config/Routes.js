import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SplashScreen from '../app/views/screens/SplashScreen/SplashScreen';
import Login from '../app/views/screens/Login/Login';
import Home from '../app/views/screens/Home/Home';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const homeName = 'Home';
const settings = 'Setting';

function HomeScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Settings!</Text>
    </View>
  );
}

const MyTabs = () => {
  return (
    <Tab.Navigator
      intialRouteName={HomeScreen}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let routeName = route.name;
          if (routeName === homeName) {
            iconName = focused ? 'home' : 'home-outline';
          }
          if (routeName === settings) {
            iconName = focused ? 'settings' : 'settings-outline';
          }
        },
      })}>
      <Tab.Screen name={homeName} component={Home} options = {{headerShown: false}}/>
      <Tab.Screen name={settings} component={SettingsScreen} />
      <Tab.Screen name={'SampleScreen'} component={HomeScreen} />
    </Tab.Navigator>
  );
};

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        >
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
