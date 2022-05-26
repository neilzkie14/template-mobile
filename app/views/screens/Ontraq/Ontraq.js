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
import {UserContext} from '../../../context/UserContext';
import arrowDown from '../../../images/arrow-down-green.png'
import DropdownList from './components/DropdownList';
const {width} = Dimensions.get('screen');


export default function Ontraq({
}) {
  const userContext = useContext(UserContext);
  const {user} = userContext.data;

  return (
    <View style={{padding: 5}}>
      {/* <DropdownList title={'December'} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
});