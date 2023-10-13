import React, { useContext } from 'react';
import { Image, Dimensions } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Global Components
import { StudentContext } from '../app/context/StudentContext';

// Screens V2
import SplashScreen from '../app/views_V2/screens/SplashScreen/SplashScreen';
import Login from '../app/views_V2/screens/Login/Login';
import Home from '../app/views_V2/screens/Home/Home';
import Registration from '../app/views_V2/screens/Registration/Registration';
import AddStudent from '../app/views_V2/screens/AddStudent/AddStudent';
import Lms from '../app/views_V2/screens/Lms/Lms';
import Index from '../app/views_V2/screens/Ontraq/Index';
import OntraqWallet from '../app/views_V2/screens/OntraqWallet/OntraqWallet';
import OntraqInOutScreen from '../app/views_V2/screens/Ontraq/components/OntraqInOutScreen';
import StudentSelection from '../app/components/StudentModalSelection';
import QrScanner from '../app/views_V2/screens/AddStudent/QrScanner';
import OntraqScreen from '../app/views_V2/screens/Ontraq/OntraqScreen'

const { width } = Dimensions.get('screen');

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
// const Drawer = createDrawerNavigator();

const homeName = 'Announcements';
const LmsName = 'LMS';
const OntraqName = 'OntraQ';
const settings = 'Settings';
const osiris = 'Osiris';

const megaphone = require('../app/images/megaphone-green.png');
const book = require('../app/images/book-green.png');
const step = require('../app/images/steps-green.png');
const settings_icon = require('../app/images/settings2.png');
const wallet_icon = require('../app/images/wallet.png');

// const SideMenu = () => {
//   return (
//     <Drawer.Navigator
//       drawerContentOptions={{
//         activeTintColor: '#e91e63',
//         itemStyle: { marginVertical: 5 },
//       }}
//       backBehavior="history"
//       drawerContent={props => <CustomMenu {...props} />}>
//       <Drawer.Screen
//         name="Dashboard"
//         component={Dashboard}
//         options={{ headerShown: true, header: header }}
//       />
//     </Drawer.Navigator>
//   );
// };

export default function Routes_V2() {
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
          name="Registration"
          component={Registration}
          options={{
            title: 'Registration',
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
          name="AddStudent"
          component={AddStudent}
          options={{
            title: 'AddStudent',
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
        <Stack.Screen
          name="StudentSelection"
          component={StudentSelection}
          options={{
            title: 'StudentSelection',
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="QrScanner"
          component={QrScanner}
          options={{
            title: 'QrScanner',
            headerShown: false,
            gestureEnabled: false,
          }}
        />
         <Stack.Screen
          name="OntraqWallet"
          component={OntraqWallet}
          options={{
            title: 'OntraqWallet',
            headerShown: false,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="Lms"
          component={Lms}
          options={{
            title: 'Lms',
            headerShown: false,
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
