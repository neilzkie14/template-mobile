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

const {width} = Dimensions.get('screen');
export default function LoginUI({
  showLogin,
  onPress
}) {
  const userContext = useContext(UserContext);
  const {user} = userContext.data;

  return (
    <TouchableWithoutFeedback onPress={() => onPress()}>
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
  );
}

const styles = StyleSheet.create({
});