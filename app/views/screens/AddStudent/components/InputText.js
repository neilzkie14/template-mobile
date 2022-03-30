import React from 'react';
import {View, Text, TextInput, Platform, TouchableOpacity} from 'react-native';

export default function InputText({
  onChangeText,
  label,
  placeholder,
  type,
  onDatePress,
}) {
  return (
    <View style={{marginTop: 20}}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#707070',
          marginBottom: 10,
        }}>
        {label}
      </Text>
      <View
        style={{
          borderWidth: 0.5,
          borderColor: '#E9E9E9',
          borderRadius: 10,
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
          padding: Platform.OS == 'ios' ? 15 : 0
        }}>
        {type == 'date' ? (
          <View>
            <TouchableOpacity onPress={onDatePress}>
              <Text>openDate</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TextInput
            placeholder={placeholder}
            onChangeText={onChangeText}
            style={{flex: 1}}
          />
        )}
      </View>
    </View>
  );
}
