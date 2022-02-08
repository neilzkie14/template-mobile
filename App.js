import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import UserContextProvider from './app/context/UserContext';
import Routes from './config/Routes';

function OtherScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Other Screen</Text>
    </View>
  );
}

const App = () => {
  return (
    <UserContextProvider>
      <SafeAreaView style={{flex: 1}}>
        <Routes />
      </SafeAreaView>
    </UserContextProvider>
  );
};

export default App;
