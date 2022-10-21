import React from 'react';
import {SafeAreaView} from 'react-native';
import {NotificationContextProvider} from './app/context/NotificationContext';
import StudentContextProvider from './app/context/StudentContext';
import UserContextProvider from './app/context/UserContext';
import Routes from './config/Routes';

const App = () => {
  return (
    <UserContextProvider>
      <NotificationContextProvider>
        <StudentContextProvider>
          <SafeAreaView style={{flex: 1}}>
            <Routes />
          </SafeAreaView>
        </StudentContextProvider>
      </NotificationContextProvider>
    </UserContextProvider>
  );
};

export default App;
