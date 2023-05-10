import React, { useState, useContext } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import Auth from './../../../api/Auth';
import { UserContext } from './../../../context/UserContext';
import Loader from '../../../components/Loader';
import AsyncStorage from '@react-native-community/async-storage';
import { StudentContext } from '../../../context/StudentContext';
import { useForm } from 'react-hook-form';
import Input from '../../../components/form/Input';
import SubmitButton from '../../../components/form/SubmitButton';
import { EMAIL_REGEX, PHONE_REGEX } from '../../../constants/regex';
import PasswordInput from '../../../components/form/PasswordInput';
import ParentLineLogo from '../../../images/parentline-logo-name.png';
const { width } = Dimensions.get('screen');

export default function Registration() {
  const userContext = useContext(UserContext);
  const studentContext = useContext(StudentContext);
  const { refreshUser } = userContext.data;
  const { refreshStudent } = studentContext.data;
  const navigation = useContext(NavigationContext);
  const [loader, setLoader] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    const response = await new Auth().register({ user: data });
    setLoader(true);
    if (response.ok) {
      await AsyncStorage.setItem('token', response.data.token);
      await refreshUser();
      await refreshStudent();
      await navigation.replace('Dashboard');
    } else {
      alert(response?.data?.errors?.join('\n'));
    }
    setLoader(false);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: 'white', paddingHorizontal:20 }} behavior={'height'} keyboardVerticalOffset={30}>
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: 'white', paddingHorizontal: 20 }}>
          <View style={{ alignItems: 'center' }}>
            <Image
              source={ParentLineLogo}
              style={{ height: 80, width: 300, marginTop: 50 }}
              resizeMethod='resize'
            />
            <Text style={{ fontSize: 32, color: '#3E414D', fontWeight: 'bold' }}>Welcome!</Text>
            <Text style={{ fontSize: 24, color: '#3E414D' }}>Create new account</Text>
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              paddingVertical: 20,
            }}>
            <View style={{ flexDirection: 'row', flex: 1, marginVertical: 20, justifyContent: 'center', alignItems: 'center' }}>
              <Input
                name="first_name"
                label="First name"
                placeholder='First Name'
                control={control}
                errors={errors}
                rules={{ required: true, maxLength: 20 }}
                style={{marginRight: 5}}
              />
              <Input
                name="last_name"
                label="Last name"
                placeholder='Last Name'
                control={control}
                errors={errors}
                rules={{ required: true, maxLength: 20 }}
                style={{marginLeft: 5}}
              />
            </View>
            <Input
              name="email"
              label="Email"
              placeholder='Email'
              control={control}
              errors={errors}
              rules={{
                required: true,
                pattern: { value: EMAIL_REGEX, message: 'Invalid email' },
              }}
              keyboardType='email-address'
            />
            <View style={{ marginTop: 20, marginBottom: 10 }}>
              <Input
                name="contact_number"
                label="Contact number"
                placeholder='Mobile Number'
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
            </View>
            <PasswordInput
              name="password"
              label=""
              placeholder='Password'
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
              label=""
              placeholder='Re-password'
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
            <SubmitButton onPress={handleSubmit(onSubmit)} label="Sign up" />
          </View>
        </View>
        {loader && <Loader />}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
