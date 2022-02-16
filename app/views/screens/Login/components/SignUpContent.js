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
  onPress
}) {
  const userContext = useContext(UserContext);
  const {user} = userContext.data;

  return (
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
      <Button buttonLabel="Sign Up" onPress={onPress} />
    </View>
  );
}

const styles = StyleSheet.create({
});