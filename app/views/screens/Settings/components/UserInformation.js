import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions, NavigationContext } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, Image, SafeAreaView, TextInput } from 'react-native';
import Loader from '../../../../components/Loader';
import arrow from '../../../../images/arrow.png'
import { UserContext } from '../../../../context/UserContext';
import { getParams } from '../../../../utils/navigation_helper';
import {useForm} from 'react-hook-form';
import Input from '../../../../components/form/Input';
import { EMAIL_REGEX, PHONE_REGEX } from '../../../../constants/regex';
export default function UserInformation({ }) {
  const navigation = useContext(NavigationContext);
  const [loading, setLoading] = useState(false);
  const userContext = useContext(UserContext);
  const params = getParams(navigation);
  const { user } = userContext.data;
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();

  const onSubmit = async data => {
    alert(JSON.stringify(data))
    // const response = await new Auth().register({user: data});
    // setLoader(true);
    // if (response.ok) {
    //   await AsyncStorage.setItem('token', response.data.token);
    //   await refreshUser();
    //   await refreshStudent();
    //   await navigation.replace('Dashboard');
    // } else {
    //   alert(response?.data?.errors?.join('\n'));
    // }
    // setLoader(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View
        style={{
          backgroundColor: '#FFFFFF',
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
            {'Personal Information'}
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, marginHorizontal: 32}}>
        <Input
          name="email"
          label="Email"
          placeholder='Enter email here'
          defaultValue={user?.email}
          control={control}
          errors={errors}
          rules={{
            required: true,
            pattern: {value: EMAIL_REGEX, message: 'Invalid email'},
          }}
        />
        <Input
          name="first_name"
          label="First name"
          placeholder='Enter first name here'
          defaultValue={user?.first_name}
          control={control}
          errors={errors}
          rules={{required: true, maxLength: 20}}
        />
        <Input
          name="last_name"
          label="Last name"
          placeholder='Enter last name here'
          defaultValue={user?.last_name}
          control={control}
          errors={errors}
          rules={{required: true, maxLength: 20}}
        />
        <Input
          name="contact_number"
          label="Contact number"
          placeholder='Enter contact number here'
          defaultValue={user?.contact_number}
          control={control}
          errors={errors}
          rules={{
            required: true,
            pattern: {
              value: PHONE_REGEX,
              message: 'Invalid phone number e.g.(09123456789)',
            },
          }}
        />
        <View style={{ padding: 6, marginTop: 18 }}>
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={{
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              backgroundColor: '#2E3192',
            }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>
              Update Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
