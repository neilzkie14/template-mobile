import React,{useContext} from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import { NavigationContext } from '@react-navigation/core';
const back = require('../../../../images/left-arrow.png')
export default function AddStudentHeader({previous, title}) {
const navigation = useContext(NavigationContext)
  return (
    <View
      style={{
        backgroundColor: '#ebebeb',
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      {previous && (
        <TouchableOpacity
          onPress={navigation.goBack}
          style={{paddingHorizontal: 8}}>
          <Image source = {back} resizeMode = 'contain' style = {{ width: 20, height: 20}}/>
        </TouchableOpacity>
      )}
      <Text style={{fontSize: 18, fontWeight: 'bold', color: '#707070'}}>{title}</Text>
    </View>
  );
}
