import React, {useEffect, useContext} from 'react';
import { NavigationContext } from '@react-navigation/native';
import {View, Text} from 'react-native'
import Auth from '../../../api/Auth';
import { StudentContext } from '../../../context/StudentContext';
import { UserContext } from '../../../context/UserContext';
import styles from './styles';

export default function SplashScreen() {
  const navigation = useContext(NavigationContext)
  const userContext = useContext(UserContext)
  const studentContext = useContext(StudentContext)
  const {refreshStudent} = studentContext.data
  const {refreshUser} = userContext.data

  const init = async () => {
    let  response = await new Auth().profile();
    if(response.ok){
      await refreshUser();
      await refreshStudent();
    }else{}
  }

  useEffect(() => {
   init()
  }, [])
  
  return (
    <View style={styles.splashscreen}>
      <Text>Splash screen</Text>
    </View>
  )
}
