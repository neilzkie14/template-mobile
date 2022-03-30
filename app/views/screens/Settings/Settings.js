import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions, NavigationContext } from '@react-navigation/native';
import React, {useContext} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import { UserContext } from '../../../context/UserContext';

export default function Settings() {
  const navigation = useContext(NavigationContext);
  const userContext = useContext(UserContext);
  const {user} = userContext.data;

  const showAlert = () => {
    Alert.alert(
      'Wait a minute!',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            confirmLogOut();
          },
        },
      ],
      'secure-text',
    );
  };

  const confirmLogOut = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'SplashScreen'}],
        }),
      );
    } catch (error) {
      console.log({error});
    }
  };

  return (
    <View style={{flex: 1, padding: 10}}>
      <TouchableOpacity
      onPress={() => showAlert()}
        style={{
          padding: 10,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          backgroundColor: '#2E3192',
        }}>
        <Text style={{fontSize: 25, fontWeight: '600', color: '#fff'}}>
          Log out
        </Text>
      </TouchableOpacity>
    </View>
  );
}
