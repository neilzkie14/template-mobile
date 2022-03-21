import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import parentlineLogo from '../../../images/parentline-logo.png';
import headstartLogo from '../../../images/headstart-logo.png';
import {NavigationContext} from '@react-navigation/native';
import Auth from './../../../api/Auth';
import {UserContext} from './../../../context/UserContext';
import Loader from '../../../components/Loader';
import AsyncStorage from '@react-native-community/async-storage';
const {width} = Dimensions.get('screen');
export default function Login() {
  const userContext = useContext(UserContext);
  const {refreshUser} = userContext.data;
  const navigation = useContext(NavigationContext);
  const [username, setUsername] = useState('parent1@tfi.com');
  const [password, setPassword] = useState('password');
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const HandleLogin = async () => {
    setLoader(true);
    let response = await new Auth().login({
      email: username,
      password: password,
    });
    console.log({response});
    if (response.ok) {
      setLoader(false);
      await AsyncStorage.setItem('token', response.data.passToken);
      await refreshUser();
      await navigation.replace('Dashboard');
    } else {
      setLoader(false);
      alert(response?.data?.errorMessage);
    }
  };
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={'height'}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            resizeMode="contain"
            source={parentlineLogo}
            style={{width: width / 1.5, height: 200}}
          />
        </View>
        <View
          style={{
            flex: 1,
            padding: 10,
            backgroundColor: '#fff',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,

            elevation: 24,
            borderTopRightRadius: 50,
            borderTopLeftRadius: 50,
            padding: 20,
            paddingHorizontal: 30
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 30, color: '#707070'}}>
              Login
            </Text>
          </View>
          <View style={{marginTop: 20}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#707070',
                marginBottom: 10,
              }}>
              E-mail / Username
            </Text>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: '#E9E9E9',
                borderRadius: 10,
              }}>
              <TextInput placeholder="Enter email here" value = {username} onChangeText ={(text) => setUsername(text)}/>
            </View>
          </View>
          <View>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#707070',
                marginBottom: 10,
              }}>
              Password
            </Text>
            <View
              style={{
                borderWidth: 0.5,
                borderColor: '#E9E9E9',
                borderRadius: 10,
                paddingHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <TextInput
                placeholder="Enter password here"
                secureTextEntry={showPassword}
                value = {password}
                style={{flex: 1}}
              />
              <TouchableOpacity onPress={() => setShowPassword(!password)} onChangeText ={(text) => setPassword(text)}>
                <Image
                  source={
                    showPassword
                      ? require('../../../images/eye-hide.png')
                      : require('../../../images/eye.png')
                  }
                  style={{width: width / 15, height: width / 15}}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 1, justifyContent: 'center'}}>
            <TouchableOpacity
              onPress={() => HandleLogin()}
              style={{
                padding: 10,
                borderRadius: 30,
                backgroundColor: '#2E3192',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 25, fontWeight: '600', color: '#fff'}}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={headstartLogo}
              style={{width: width / 1.5, height: 200}}
              resizeMode="contain"
            />
          </View>
        </View>
        {loader && <Loader />}
      </View>
    </KeyboardAvoidingView>
  );
}
