import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContext } from '@react-navigation/native';
import React, {useEffect, useContext} from 'react';
import {View, Dimensions, Image} from 'react-native'
import Auth from '../../../api/Auth';
import { StudentContext } from '../../../context/StudentContext';
import { UserContext } from '../../../context/UserContext';
import splashScreenImg from '../../../images/SplashScreen.png' 
const {width, height} = Dimensions.get('screen');

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
      navigation.replace('Dashboard')
    }else{
      navigation.replace('Login')
    }
  }

  useEffect(() => {
   init()
  }, [])
  

  return (
    <View style = {{ flex: 1 }}>
      <Image source={splashScreenImg} style = {{ justifyContent: 'center', alignItems: 'center', width: width, height: height }} resizeMode = 'contain'/>
    </View>
  )
}
