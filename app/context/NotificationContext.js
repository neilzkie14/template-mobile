// import AsyncStorage from '@react-native-community/async-storage';
import AsyncStorage from '@react-native-community/async-storage';
import React, {Component, useContext, useEffect, useRef} from 'react';
import {Notifications} from 'react-native-notifications';
// import {API_URL} from '../api/Base';
import Auth from '../api/Auth';
import {SOCKET_URL} from '../constants';
import {UserContext} from './UserContext';
export const NotificationContext = React.createContext();

export const NotificationContextProvider = ({children}) => {
  const userContext = useContext(UserContext);
  const {user} = userContext.data;
  const connection = useRef(null);

  const notify = (title, body) => {
    Notifications.postLocalNotification({
      body,
      title,
      silent: false,
      category: 'Notification',
      userInfo: {},
    });
  };

  const connect = async () => {
    console.log('Initializing socket connection');
    let token = await AsyncStorage.getItem('token');
    if (token) {
      let socket = new WebSocket(SOCKET_URL);
      socket.onopen = () => {
        console.log('Socket connection established');
        console.log('Subscribing to notifications');
        const msg = {
          command: 'subscribe',
          identifier: JSON.stringify({
            channel: 'NotificationChannel',
            token: token,
          }),
        };
        socket.send(JSON.stringify(msg));
      };
      socket.onmessage = async e => {
        let data = JSON.parse(e.data);
        if (data?.type == 'ping') return;
        console.log('Received notification');
        console.log({data});
        if (data?.message?.type == 'sms_status') {
          notify('Announcement', data?.message?.content);
        }
      };

      socket.onclose = e => {
        console.log('Socket connection closed');
        console.log(e);
      };

      socket.onerror = e => {
        console.log('Socket connection error');
        console.log(e);
      };
    }
  };

  useEffect(() => {
    if (user != null) {
      connect();
    }
  }, [user]);

  return (
    <NotificationContext.Provider value={{}}>
      {children}
    </NotificationContext.Provider>
  );
};
