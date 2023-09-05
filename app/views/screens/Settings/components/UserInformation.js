import { NavigationContext } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import Loader from '../../../../components/Loader';
import arrow from '../../../../images/arrow.png'
import { UserContext } from '../../../../context/UserContext';
import {StudentContext} from '../../../../context/StudentContext';
import {useForm} from 'react-hook-form';
import Input from '../../../../components/form/Input';
import { EMAIL_REGEX, PHONE_REGEX } from '../../../../constants/regex';
import Auth from '../../../../api/Auth';
import UserProfilePicture from '../../../../images/profile.png';
import Camera from '../../../../images/camera.png';

const { width } = Dimensions.get('screen');

export default function UserInformation({ }) {
  const navigation = useContext(NavigationContext);
  const studentContext = useContext(StudentContext);
  const userContext = useContext(UserContext);
  const { user, refreshUser } = userContext.data;
  console.log({user})
  const {refreshStudent} = studentContext.data;
  const [loader, setLoader] = useState(false);
  const {
    control,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();

  const onSubmit = async data => {
    const response = await new Auth().updateProfile({user: data});
    setLoader(true);
    if (response.ok) {
      await refreshUser();
      await refreshStudent();
      alert(response?.data?.message);
    } else {
      alert(response?.data?.errors?.join('\n'));
    }
    setLoader(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <View
        style={{
          backgroundColor: '#FFFFFF',
          justifyContent:'center',
          height: 50
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute',  justifyContent: 'center', padding: 30, zIndex: 99 }}>
          <Image
            source={arrow}
            style={{
              height: 20,
              width: 20,
              tintColor: '#BCB5B5',
              transform: [{ rotate: '90deg' }],
              marginTop: 10
            }}
            resizeMethod="resize"
          />
        </TouchableOpacity>
      </View>
      <View style={{justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row', marginHorizontal: 30, marginTop: 20}}>
        <Image
            source={UserProfilePicture}
            style={{
              height: 95,
              width: 95,
            }}
            resizeMethod="resize"
          />
        {/* <Image
          source={Camera}
          style={{
            height: 36,
            width: 36,
            position: "absolute",
            left: 65,
            bottom: -10
          }}
          resizeMethod="resize"
        /> */}
        <View style={{paddingHorizontal: 20}}>
          <View style={{flexDirection: 'row', }}>
            <Text style={{fontSize: 32, color: '#17254A', fontWeight: 'bold'}}>
              {`${user?.first_name } ${user?.last_name}`}
            </Text>
          </View>
          <Text>
            {user?.role}
          </Text>
        </View>
      </View>
      <View style={{flex: 1, margin: 20, marginTop: 30}}>
        <Text style={{padding: 10, fontSize: 16, color: '#17254A', fontWeight: 'bold'}}>First Name</Text>
        <Input
          name="first_name"
          label="First name"
          placeholder='First Name'
          defaultValue={user?.first_name}
          control={control}
          errors={errors}
          style={{marginHorizontal: 10}}
          rules={{required: true, maxLength: 20}}
        />
        <Text style={{padding: 10, fontSize: 16, color: '#17254A', fontWeight: 'bold'}}>Last Name</Text>
        <Input
          name="last_name"
          label="Last name"
          placeholder='Last Name'
          defaultValue={user?.last_name}
          control={control}
          errors={errors}
          style={{marginHorizontal: 10}}
          rules={{required: true, maxLength: 20}}
        />
        <View style={{ padding: 6, marginTop: 64, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={{
              padding: 10,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
              backgroundColor: '#A3D063',
              width: width / 1.5
            }}>
            <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {loader && <Loader />}
    </View>
  );
}
