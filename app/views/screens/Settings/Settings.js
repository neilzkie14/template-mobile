import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions, NavigationContext } from '@react-navigation/native';
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import { UserContext } from '../../../context/UserContext';

import arrow from '../../../images/arrow.png'
import profile from '../../../images/profile.png'
export default function Settings() {
  const navigation = useContext(NavigationContext);
  const userContext = useContext(UserContext);
  const { user } = userContext.data;

  const showAlert = () => {
    Alert.alert(
      'Wait a minute!',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => { },
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
      await AsyncStorage.clear();
      await navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'SplashScreen' }],
        }),
      );
    } catch (error) {
      console.log({ error });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: '#707070'
        }}>
        <TouchableOpacity onPress={{}} style={{ position: 'absolute', height: 70, justifyContent: 'center', padding: 10, zIndex: 99 }}>
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
            {'Settings'}
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center' }}>
            <Text style={{ fontSize: 16 }}>Personal Information</Text>
            <TouchableOpacity onPress={() => alert('Under Development')} style={{ padding: 5 }}>
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
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center' }}>
            <Text style={{ fontSize: 16 }}>Security</Text>
            <TouchableOpacity onPress={() => alert('Under Development')} style={{ padding: 5 }}>
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
        <View>

          <Text style={{ fontSize: 16, fontWeight: '500', color: '#707070', paddingHorizontal: 15 }}>
            Children
          </Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => alert('Under Development')} style={{ paddingRight: 10 }}>
              <Image
                source={profile}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: '#A3D063',
                }}
                resizeMethod="resize"
              />
            </TouchableOpacity>
            <Text style={{ fontSize: 16 }}>Child 1</Text>
            </View>
            <TouchableOpacity onPress={() => alert('Under Development')} style={{ padding: 5 }}>
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
        <View style={{ paddingHorizontal: 5, marginBottom: 100 }}>
          <TouchableOpacity
            onPress={() => showAlert()}
            style={{
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              backgroundColor: '#2E3192',
            }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>
              Log out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
