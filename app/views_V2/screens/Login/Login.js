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
import parentlineLogo from '../../../images/parentline-logo.png';
import headstartLogo from '../../../images/headstart-logo.png';
import {NavigationContext} from '@react-navigation/native';
import Auth from './../../../api/Auth';
import {UserContext} from './../../../context/UserContext';
import Loader from '../../../components/Loader';
import AsyncStorage from '@react-native-community/async-storage';
import {StudentContext} from '../../../context/StudentContext';
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
      await navigation.replace('Home');
    } else {
      setLoader(false);
      alert(response?.data?.message);
    }
  };

  const onToggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={'height'}>
      <View style={{flex: 1, backgroundColor: 'white', justifyContent: 'center', paddingHorizontal: 20}}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{justifyContent: 'center', flex: 1}}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              resizeMode="contain"
              source={parentlineLogo}
              style={{width: width / 1.5, height: 100}}
            />
          </View>
            <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 20}}>
              <Text style={{fontWeight: 'bold', fontSize: 30, color: '#3E414D'}}>
              Welcome Back!
              </Text>
              <Text style={{fontSize: 18, color: '#3E414D',fontWeight: '500'}}>
              Sign in to continue
              </Text>
            </View>
            <View style={{marginVertical: 20}}>
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
                  value={username}
                  placeholder="Email"
                  onChangeText={text => setUsername(text)}
                  style={{flex: 1, padding: Platform.OS == 'ios' ? 15 : 10, color: '#000'}}
                />
              </View>
            </View>
            <View>
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
                  value={password}
                  placeholder="Password"
                  secureTextEntry={showPassword}
                  style={{flex: 1, padding: Platform.OS == 'ios' ? 15 : 10, color: '#000'}}
                  onChangeText={text => setPassword(text)}
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
            <View style={{ justifyContent: 'center', marginTop: 24}}>
              <TouchableOpacity
                onPress={() => HandleLogin()}
                style={{
                  padding: 10,
                  borderRadius: 5,
                  backgroundColor: '#A3D063',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderColor: '#2E3192',
                  borderWidth: 1,
                }}>
                <Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>
                  Login
                </Text>
              </TouchableOpacity>
              <View style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 16}}>
                <Text style={{ fontSize: 16, color: '#3E414D', fontWeight: '400'}}>
                Not registered yet?
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Registration')}>
                  <Text style={{fontSize: 16, color: '#A3D063', fontWeight: '500'}}>
                  {' Sign up now'}
                  </Text>
                </TouchableOpacity>
              </View>
              {/* <TouchableOpacity
                onPress={() => navigation.navigate('Registration')}
                style={{
                  padding: 10,
                  borderRadius: 30,
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderColor: '#2E3192',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 25, fontWeight: '600', color: '#2E3192'}}>
                  Register
                </Text>
              </TouchableOpacity> */}
            </View>
        </ScrollView>
        {loader && <Loader />}
      </View>
    </KeyboardAvoidingView>
  );
}
