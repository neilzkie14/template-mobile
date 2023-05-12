import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions, NavigationContext } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, Image, SafeAreaView, Modal } from 'react-native';
import Loader from '../../../../components/Loader';
import arrow from '../../../../images/arrow.png'
import { UserContext } from '../../../../context/UserContext';
import { getParams } from '../../../../utils/navigation_helper';
import Auth from '../../../../api/Auth';
import Input from '../../../../components/form/Input';
import { useForm } from 'react-hook-form';
import { EMAIL_REGEX } from '../../../../constants/regex';
export default function SecuritySettings({ }) {
  const navigation = useContext(NavigationContext);
  const [loading, setLoading] = useState(false);
  const userContext = useContext(UserContext);
  const params = getParams(navigation);
  const { user } = userContext.data;
  const {
    control,
    formState: {errors},
  } = useForm();

  const showAlert = () => {
    Alert.alert(
      'Important!',
      'Are you sure you really want to delete your account?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            confirmDeletion();
          },
        },
      ],
      'secure-text',
    );
  };

  const confirmDeletion = async () => {
    let token = await AsyncStorage.getItem('token');
    let response = await new Auth().accountDeletion(token);
    if (response.ok) {
      try {
        await AsyncStorage.removeItem('token');
        await AsyncStorage.clear();
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{name: 'SplashScreen'}],
          }),
        );
      } catch (error) {
        console.log({error});
      }
    } else {
      alert('Something went wrong white deleting you account.');
    }
  };

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
      <TouchableOpacity onPress={() => navigation.navigate('PasswordScreen')} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#E9E9E9', padding: 12, marginHorizontal: 5, borderRadius: 10, flex: 1}}>
          <Text style={{ fontSize: 16, paddingLeft: 10, color: '#707070' }}>{'Password'}</Text>
        </View>
      </TouchableOpacity>
      <Input
        name="contact"
        label="contact"
        placeholder='Mobile Number'
        defaultValue={user?.contact_number}
        editable={false}
        control={control}
        errors={errors}
        style={{marginHorizontal: 20}}
        rules={{
          required: true,
          pattern: {value: EMAIL_REGEX, message: 'Invalid email'},
        }}
      />
      <Input
        name="email"
        label="Email"
        placeholder='Email'
        defaultValue={user?.email}
        editable={false}
        control={control}
        errors={errors}
        style={{marginHorizontal: 20, marginTop: 15}}
        rules={{
          required: true,
          pattern: {value: EMAIL_REGEX, message: 'Invalid email'},
        }}
      />
      <TouchableOpacity onPress={() => showAlert()} style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 15, alignItems: 'center', marginTop: 50 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, paddingLeft: 10, color: '#D82E2E' }}>{'Delete Account'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
