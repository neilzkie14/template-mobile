import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import parentlineLogo from '../../../images/parentline-logo.png';
import headstartLogo from '../../../images/headstart-logo.png';
import {NavigationContext} from '@react-navigation/native';
import Auth from './../../../api/Auth';
import {UserContext} from './../../../context/UserContext';
import Loader from '../../../components/Loader';
import AsyncStorage from '@react-native-community/async-storage';
import { StudentContext } from '../../../context/StudentContext';
const {width} = Dimensions.get('screen');
export default function Login() {
  const userContext = useContext(UserContext);
  const studentContext = useContext(StudentContext);
  const {refreshUser} = userContext.data;
  const {refreshStudent} = studentContext.data;
  const navigation = useContext(NavigationContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
      await AsyncStorage.setItem('token', response.data.token);
      await refreshUser();
      await refreshStudent();
      await navigation.replace('Dashboard');
    } else {
      setLoader(false);
      alert(response?.data?.message);
    }
  };

  const onToggleShowPassword = () => {
    setShowPassword(!showPassword);
  }
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
                paddingHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center'
              }}>
              <TextInput placeholder="Enter email here" onChangeText ={(text) => setUsername(text)} style = {{ flex: 1, padding: Platform.OS == 'ios' ? 15 : 0 }}/>
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
                style={{flex: 1, padding: Platform.OS == 'ios' ? 15 : 0}}
                onChangeText = {(text) => setPassword(text)}
              />
              <TouchableOpacity onPress={() => onToggleShowPassword()}>
                <Image
                  source={
                    showPassword
                      ? require('../../../images/eye.png')
                      : require('../../../images/eye-hide.png')
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
