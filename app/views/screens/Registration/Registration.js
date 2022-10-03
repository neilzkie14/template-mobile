import React, {useState, useContext} from 'react';
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
import {NavigationContext} from '@react-navigation/native';
import Auth from './../../../api/Auth';
import {UserContext} from './../../../context/UserContext';
import Loader from '../../../components/Loader';
import AsyncStorage from '@react-native-community/async-storage';
import {StudentContext} from '../../../context/StudentContext';
import {useForm} from 'react-hook-form';
import Input from '../../../components/form/Input';
import SubmitButton from '../../../components/form/SubmitButton';
import {EMAIL_REGEX, PHONE_REGEX} from '../../../constants/regex';
import PasswordInput from '../../../components/form/PasswordInput';
const {width} = Dimensions.get('screen');

export default function Registration() {
  const userContext = useContext(UserContext);
  const studentContext = useContext(StudentContext);
  const {refreshUser} = userContext.data;
  const {refreshStudent} = studentContext.data;
  const navigation = useContext(NavigationContext);
  const [loader, setLoader] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();

  const onSubmit = async data => {
    const response = await new Auth().register({user: data});
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
    <KeyboardAvoidingView style={{flex: 1}} behavior={'height'}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              paddingVertical: 20,
              paddingHorizontal: 30,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{paddingRight: 12}}>
                <Image source = {require('../../../images/left-arrow.png')} resizeMode = 'contain' style = {{ width: 20, height: 20}}/>
              </TouchableOpacity>
              <Text style={{fontWeight: 'bold', fontSize: 30, color: '#707070'}}>
                Registration
              </Text>
            </View>
            <Input
              name="email"
              label="Email"
              placeholder='Enter email here'
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
              control={control}
              errors={errors}
              rules={{required: true, maxLength: 20}}
            />
            <Input
              name="last_name"
              label="Last name"
              placeholder='Enter last name here'
              control={control}
              errors={errors}
              rules={{required: true, maxLength: 20}}
            />
            <Input
              name="contact_number"
              label="Contact number"
              placeholder='Enter contact number here'
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

            <PasswordInput
              name="password"
              label="Password"
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

            <SubmitButton onPress={handleSubmit(onSubmit)} label="REGISTER" />
          </View>
        </ScrollView>
        {loader && <Loader />}
      </View>
    </KeyboardAvoidingView>
  );
}
