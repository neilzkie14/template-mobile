import { NavigationContext } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { UserContext } from '../../../../context/UserContext';
import { StudentContext } from '../../../../context/StudentContext';
import arrow from '../../../../images/arrow.png'
import PasswordInput from '../../../../components/form/PasswordInput';
import {useForm} from 'react-hook-form';
import Auth from '../../../../api/Auth';
import Loader from '../../../../components/Loader';
export default function Settings() {
  const navigation = useContext(NavigationContext);
  const userContext = useContext(UserContext);
  const studentContext = useContext(StudentContext);
  const {refreshUser} = userContext.data;
  const {refreshStudent} = studentContext.data;
  const [loader, setLoader] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();

  const onSubmit = async data => {
    const response = await new Auth().changePassword(data= {
      "old_password": data?.current_password,
      "new_password": data?.password
  });
    setLoader(true);
    if (response.ok) {
      await refreshUser();
      await refreshStudent();
      alert(response?.data?.message);
      navigation.navigate('Settings');
    } else {
      alert(response?.data?.message);
    }
    setLoader(false);
  };

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
      <View style={{ flex: 1, marginHorizontal: 32}}>
        <PasswordInput
          name="current_password"
          label="Current Password"
          placeholder='Enter current password here'
          control={control}
          errors={errors}
          rules={{
            required: true,
            maxLength: 20,
          }}
        />
        <PasswordInput
          name="password"
          label="New Password"
          placeholder='Enter password here'
          control={control}
          errors={errors}
          rules={{
            required: true,
            maxLength: 20,
            validate: {
              value: async value => {
                if (value === watch('confirm_password')) {
                  if (errors['confirm_password'] != null) {
                    errors['confirm_password'] = null;
                  }
                  return true;
                } else {
                  return 'Password mismatch';
                }
              },
            },
          }}
        />
        <PasswordInput
          name="confirm_password"
          label="Confirm password"
          placeholder='Enter confirm password here'
          control={control}
          errors={errors}
          rules={{
            required: true,
            maxLength: 20,
            validate: {
              value: async value => {
                if (value === watch('password')) {
                  if (errors['password'] != null) {
                    errors['password'] = null;
                  }
                  return true;
                } else {
                  return 'Password mismatch';
                }
              },
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
              Change Password
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {loader && <Loader />}
    </View>
  );
}