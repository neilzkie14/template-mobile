import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

export default function SubmitButton({onPress, label}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        marginTop: 50,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#A3D063',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{fontSize: 18, fontWeight: 'bold', color: '#fff'}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
