import React from 'react';
import {useController} from 'react-hook-form';
import {Platform, Text, View, TextInput} from 'react-native';
import formatErrorMessage from '../../utils/formatErrorMessage';

export default function Input({
  label,
  name,
  control,
  defaultValue = '',
  placeholder = '',
  rules = {},
  errors = {},
}) {
  const {field} = useController({
    control,
    defaultValue,
    name,
    rules,
  });

  const error = errors[name];

  return (
    <View style={{marginTop: 20}}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#707070',
          marginVertical: 10,
        }}>
        {label}
      </Text>
      <View
        style={{
          borderWidth: 0.5,
          borderColor: error != null ? 'red' : '#E9E9E9',
          borderRadius: 10,
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TextInput
          placeholder={placeholder}
          value={field.value}
          onChangeText={field.onChange}
          style={{flex: 1, padding: Platform.OS == 'ios' ? 15 : 10}}
        />
      </View>
      {error != null && (
        <Text style={{color: 'red', fontSize: 12}}>
          {formatErrorMessage(error)}
        </Text>
      )}
    </View>
  );
}
