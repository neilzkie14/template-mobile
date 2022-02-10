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
const {width} = Dimensions.get('screen');
export default function Login() {
  const [showLogin, setShowLogin] = useState(true);
  const navigation = useContext(NavigationContext)
  const toLogin = () => {
    setShowLogin(true);
  };

  const toSignUp = () => {
    setShowLogin(false);
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
          <TouchableWithoutFeedback onPress={() => toLogin()}>
            <View
              style={{
                width: '50%',
                height: 100,
                backgroundColor: showLogin ? '#fff' : '#A3D063',
                alignItems: 'center',
                borderTopRightRadius: 50,
                borderTopLeftRadius: 50,
              }}>
              <Text
                style={{
                  height: 100,
                  textAlignVertical: 'center',
                  color: showLogin ? '#707070' : '#fff',
                  fontSize: 25,
                  paddingTop: 20,
                }}>
                Login
              </Text>
              {!showLogin ? (
                <Image
                  resizeMode="stretch"
                  style={{height: 25, width: '100%'}}
                  source={curve}
                />
              ) : (
                <View style={{height: 25, backgroundColor: '#fff'}} />
              )}
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => toSignUp()}>
            <View
              style={{
                width: '50%',
                height: 100,
                backgroundColor: showLogin ? '#A3D063' : '#fff',
                alignItems: 'center',
                borderTopRightRadius: 50,
                borderTopLeftRadius: 50,
              }}>
              <Text
                style={{
                  height: 100,
                  textAlignVertical: 'center',
                  color: showLogin ? '#fff' : '#707070',
                  fontSize: 25,
                  paddingTop: 20,
                }}>
                Sign Up
              </Text>
              {showLogin ? (
                <Image
                  resizeMode="stretch"
                  style={{height: 25, width: '100%'}}
                  source={curve}
                />
              ) : (
                <View style={{height: 25, backgroundColor: '#fff'}} />
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
        {showLogin ? (
          <View>
            <View style={{marginBottom: 35}}>
              <FormInput
                data={{
                  label: 'E-mail / Username',
                  placeholder: 'Enter e-mail or username here',
                }}
              />
            </View>
            <FormInput
              data={{
                label: 'Password',
                placeholder: 'Enter password here',
                isPassword: true,
              }}
            />
            <View>
              <Text
                style={{
                  color: '#A3D063',
                  fontSize: 15,
                  alignSelf: 'flex-end',
                  marginRight: 20,
                  marginBottom: 35,
                }}>
                Forgot Password?
              </Text>
            </View>
            <Button buttonLabel="Login" onPress = {() => navigation.push('Dashboard') } />
            <View style={{height: 70, marginVertical: '10%'}}>
              <Text
                style={{
                  marginLeft: width * 0.3,
                  color: '#BCBCBC',
                  fontSize: 15,
                }}>
                Powered by,
              </Text>
              <Image
                resizeMode="contain"
                source={headstartLogo}
                style={{width: '100%', height: 70}}
              />
            </View>
          </View>
        ) : (
          <View style={{marginBottom: 35}}>
            <View style={{marginBottom: 15}}>
              <FormInput
                data={{
                  label: 'Full Name',
                  placeholder: 'Enter full name here',
                }}
              />
            </View>
            <View style={{marginBottom: 15}}>
              <FormInput
                data={{
                  label: 'Email / Username',
                  placeholder: 'Enter email or username here',
                }}
              />
            </View>
            <View style={{marginBottom: 15}}>
              <FormInput
                data={{
                  label: 'Password',
                  placeholder: 'Enter password here',
                  isPassword: true,
                }}
              />
            </View>
            <View style={{marginBottom: 35}}>
              <FormInput
                data={{
                  label: 'Repeat Password',
                  placeholder: 'Re-enter password here',
                  isPassword: true,
                }}
              />
            </View>
            <Button buttonLabel="Sign Up" />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
