import React, { useContext } from 'react'
import { View, Text, Image } from 'react-native'
import ParentImg from '../../../images/Parent.png'
import ParentImg2 from '../../../images/Parent_image.png'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { NavigationContext } from '@react-navigation/native'

export default function LoginOptional() {
  const navigation = useContext(NavigationContext);

  return (
    <View style={{ flex: 1, alignItems: 'center', paddingVertical: 20}}>
      <View>
        <Image source={ParentImg}
          style={{ height: 100, width: 200, marginVertical: 50 }}
          resizeMode='contain' />
      </View>
      <View>
        <Image source={ParentImg2}
          style={{ height: 200, width: 200, marginTop: -30 }}
          resizeMode='contain' />
      </View>
      <Text style={{ fontSize: 24, textAlign: 'center', height: 100, width: '80%', padding: 20, fontWeight: 'bold', color: '#3E414D' }}>
        Makes it easy to communicate with parents
      </Text>
      <View style={{ borderRadius: 10, height: 50, width: '70%', borderColor: '#A3D063', borderWidth: 1 }}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={{
              padding: 10,
              borderRadius: 10,
              backgroundColor: '#A3D063',
              borderWidth: 1,
              borderColor: '#A3D063',
              height: 50,
              width: 142
            }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: 'white', textAlign: 'center' }}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Registration')}
            style={{
              padding: 10,
              borderRadius: 10,
              backgroundColor: 'white',
              borderWidth: 1,
              borderColor: '#A3D063',
              height: 50,
              width: 144
            }}>
            <Text style={{ fontSize: 18, fontWeight: '600', color: 'black', textAlign: 'center' }}>
              Sign up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
