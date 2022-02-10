import { NavigationContext } from '@react-navigation/native';
import React, {useEffect, useContext} from 'react';
import {View, Text} from 'react-native'

export default function SplashScreen() {
  const navigation = useContext(NavigationContext)

  useEffect(() => {
    const timer = setTimeout(() => navigation.push('Login'), 2000);
    return(
      () => clearTimeout(timer)
    )
  }, [navigation])
  

  return (
    <View style = {{ flex: 1 }}>
      <Text>This is SplashScreen Page</Text>
    </View>
  )
}
