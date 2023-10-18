import React from 'react';
import {SafeAreaView} from 'react-native';
import {NotificationContextProvider} from './app/context/NotificationContext';
import StudentContextProvider from './app/context/StudentContext';
import UserContextProvider from './app/context/UserContext';
import Routes from './config/Routes';
import {APP_BUILD, BUILD_TYPES} from './env';

const App = () => {
  if (APP_BUILD == BUILD_TYPES.V1) {
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
  }
  // if (APP_BUILD == BUILD_TYPES.V2) {
  //   return (
  //     <UserContextProvider>
  //       <NotificationContextProvider>
  //         <StudentContextProvider>
  //           <SafeAreaView style={{flex: 1}}>
  //             <Routes_V2 />
  //           </SafeAreaView>
  //         </StudentContextProvider>
  //       </NotificationContextProvider>
  //     </UserContextProvider>
  //   );
  // }
};

export default App;
