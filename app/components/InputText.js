import React from 'react';
import { TextInput, View, Dimensions } from 'react-native';

export default function InputText({ placeholder, onChangeText, value, style, keyboardType }) {
  const { width } = Dimensions.get('window');
  return (
    <View>
      <TextInput
        style={[
          {
            padding: 13,
            borderRadius: 5,
            backgroundColor: '#e6e6e6',
            marginBottom: 10,
            color: '#000'
          },
          style,
        ]}
        placeholder={placeholder}
        onChangeText={onChangeText}
        autoCapitalize = 'none'
        value={value}
        keyboardType={keyboardType}
      />
    </View>
  );
}

