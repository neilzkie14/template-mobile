import AsyncStorage from '@react-native-community/async-storage';
import { NavigationContext } from '@react-navigation/native';
import React, {useEffect, useContext} from 'react';
import {View, Text, Dimensions, Image} from 'react-native'
import Auth from '../../../api/Auth';
import { UserContext } from '../../../context/UserContext';
import splashScreenImg from '../../../images/splash-screen.gif' 
const {width, height} = Dimensions.get('screen');

export default function SplashScreen() {
  const navigation = useContext(NavigationContext)
  const userContext = useContext(UserContext)
  const {refreshUser} = userContext.data

  const init = async () => {
    let  response = await new Auth().profile();
    if(response.ok){
      await refreshUser();
      navigation.navigate('Dashboard')
    }else{
      navigation.navigate('Login')
    }
  }

  useEffect(() => {
   init()
  }, [])
  

  return (
    <View style = {{ flex: 1 , height:height, maxWidth:width }}>
      <Image source={splashScreenImg} height={height} maxWidth={width} />
    </View>
  )
}
