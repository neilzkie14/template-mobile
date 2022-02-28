import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import Button from '../../../components/Button';
import FormInput from '../../../components/FormInput';
import curve from '../../../images/curve.png';
import parentlineLogo from '../../../images/parentline-logo.png';
import headstartLogo from '../../../images/headstart-logo.png';
import { NavigationContext } from '@react-navigation/native';
import LoginUI from './components/LoginUI';
import SignUpUI from './components/SignUpUI';
import LoginContent from './components/LoginContent';
import SignUpContent from './components/SignUpContent';
import Auth from './../../../api/Auth'
import {UserContext} from './../../../context/UserContext'
import Loader from '../../../components/Loader';
import AsyncStorage from '@react-native-community/async-storage';
const {width} = Dimensions.get('screen');
export default function Login() {
  const userContext = useContext(UserContext)
  const {refreshUser} = userContext.data
  const [showLogin, setShowLogin] = useState(true);
  const navigation = useContext(NavigationContext);
  const [username, setUsername] = useState('parent');
  const [password, setPassword] = useState('parent');
  const [loader, setLoader] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const toLogin = () => {
    setShowLogin(true);
    setShowForgotPassword(false);
  };

  const toSignUp = () => {
    setShowLogin(false);
  };

  const HandleLogin = async () => {
    setLoader(true)
    let response = await new Auth().login({
    username,
    password,
    });
    console.log({response})
    if(response.ok){
    setLoader(false)
    await AsyncStorage.setItem('token', response.data.passToken)
    await refreshUser();
    await navigation.push('Dashboard')
    }else{
    setLoader(false)
    alert(response?.data?.errorMessage)
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View style={{height: 150, marginVertical: '10%'}}>
          <Image
            resizeMode="contain"
            source={parentlineLogo}
            style={{width: '100%', height: 150}}
          />
        </View>
        <View style={{flexDirection: 'row', width: '100%', marginBottom: 40}}>
          <LoginUI onPress={() => toLogin()} showLogin={showLogin} />
          <SignUpUI onPress={() => toSignUp()} showLogin={showLogin} />
        </View>
        {showLogin ? (
          <LoginContent 
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            showForgotPassword={showForgotPassword} 
            setShowForgotPassword={setShowForgotPassword}
            onPress = {() => showForgotPassword ? alert('Under Development') : HandleLogin() } 
          />
        ) : (
          <SignUpContent
            onPress = {() => alert('Under Development')}
           />
        )}
      { loader && <Loader />}
      </ScrollView>
    </View>
  );
}
