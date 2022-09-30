import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions, NavigationContext } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, Image, SafeAreaView, Modal } from 'react-native';
import Loader from '../../../../components/Loader';
import arrow from '../../../../images/arrow.png'
import { UserContext } from '../../../../context/UserContext';
import { getParams } from '../../../../utils/navigation_helper';
export default function SecuritySettings({ }) {
  const navigation = useContext(NavigationContext);
  const [loading, setLoading] = useState(false);
  const userContext = useContext(UserContext);
  const params = getParams(navigation);
  const { user } = userContext.data;

  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: '#707070'
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', height: 70, justifyContent: 'center', padding: 10, zIndex: 99 }}>
          <Image
            source={arrow}
            style={{
              height: 20,
              width: 20,
              tintColor: '#A3D063',
              transform: [{ rotate: '90deg' }],
            }}
            resizeMethod="resize"
          />
        </TouchableOpacity>
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#707070',
              fontWeight: 'bold',
              fontSize: 20,
              padding: 20
            }}
          >
            {'Security'}
          </Text>
        </View>
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, paddingLeft: 10 }}>{'Password'}</Text>
        </View>
        <TouchableOpacity 
              onPress={() => navigation.navigate('PasswordScreen')}
              style={{ padding: 5 }}>
          <Image
            source={arrow}
            style={{
              height: 20,
              width: 20,
              tintColor: '#707070',
              transform: [{ rotate: '270deg' }],
            }}
            resizeMethod="resize"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
