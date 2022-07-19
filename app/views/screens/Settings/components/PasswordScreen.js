import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions, NavigationContext } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, Image, TextInput } from 'react-native';
import { UserContext } from '../../../../context/UserContext';
import { StudentContext } from '../../../../context/StudentContext';
import arrow from '../../../../images/arrow.png'
import profile from '../../../../images/profile.png'
import Chrildren from './Children';
import ChildInfomation from './ChildInformation';
export default function Settings() {
  const navigation = useContext(NavigationContext);
  const userContext = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const studentContext = useContext(StudentContext);
  const { setStudent, students, student, refreshStudent } = studentContext.data;
  const { refreshUser } = userContext.data;

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

  console.log({ student })

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
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
            {'Password'}
          </Text>
        </View>
      </View>
      <View style={{ flex: 1}}>
        <Text style={{color: '#707070', fontSize: 20, fontWeight: '500', padding: 20}}>Change Password</Text>
        <View
          style={{
            backgroundColor: '#fff',
            flexDirection: 'row',
            // justifyContent: 'space-between',
            alignItems: 'center',
            padding: 5,
            marginLeft: 10,
          }}>
          <Text
            style={{
              color: '#707070',
              fontSize: 16,
              width: 150,
            }}
          >
            New Password:
          </Text>
          <TextInput
            placeholder={'Enter new password here'}
            onChangeText={text => setNewPassword(text)}
            style={{ borderBottomColor: 'gray', borderBottomWidth: 0.5 }}
          />
        </View>
        <View
          style={{
            backgroundColor: '#fff',
            // justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 5,
            marginLeft: 10,
          }}>
          <Text
            style={{
              color: '#707070',
              width: 150,
              fontSize: 16,
            }}
          >
            Confirm Password:
          </Text>
          <TextInput
            placeholder={'Confirm new password here'}
            onChangeText={text => setConfirmPassword(text)}
            style={{ borderBottomColor: 'gray', borderBottomWidth: 0.5 }}
          />
        </View>
        <View style={{ padding: 5 }}>
          <TouchableOpacity
            onPress={() => alert('Under Development!')}
            style={{
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              backgroundColor: '#2E3192',
            }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>
              Change Password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
