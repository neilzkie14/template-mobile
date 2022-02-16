import React, {useState, useContext} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import curve from '../../../../images/curve.png';
import {UserContext} from '../../../../context/UserContext';
import headstartLogo from '../../../../images/headstart-logo.png';
import FormInput from '../../../../components/FormInput';
import Button from '../../../../components/Button';

const {width} = Dimensions.get('screen');
export default function LoginContent({
  showLogin,
  onPress,
  showForgotPassword,
  setShowForgotPassword
}) {
  const userContext = useContext(UserContext);
  const {user} = userContext.data;

  return (
    <View>
      {showForgotPassword ? 
        <View style={{marginBottom: 35}}>
          <FormInput
            data={{
              label: 'E-mail / Username',
              placeholder: 'Enter e-mail or username here',
            }}
          />
        </View>
        :
        <>
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
        </>
      }
      <TouchableWithoutFeedback onPress={() => setShowForgotPassword(true)}>
        <View style={{display: showForgotPassword ? 'none' : 'flex'}}>
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
      </TouchableWithoutFeedback>
      <Button buttonLabel={showForgotPassword ? "Recover Password" : "Login"} onPress = {() => onPress() } />
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
  );
}

const styles = StyleSheet.create({
});