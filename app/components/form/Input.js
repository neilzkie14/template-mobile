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
  editable,
  keyboardType,
  style
}) {
  const {field} = useController({
    control,
    defaultValue,
    name,
    rules,
  });

  const error = errors[name];

  return (
    <View style={{flex: 1}}>
      <View
        style={[{
          borderWidth: 0.5,
          borderColor: error != null ? 'red' : '#E9E9E9',
          borderRadius: 10,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#fff',
        },style]}>
        <TextInput
          editable={editable}
          placeholder={placeholder}
          value={field.value}
          onChangeText={field.onChange}
          style={{ padding: Platform.OS == 'ios' ? 15 : 10, color: '#000', paddingHorizontal: 20, }}
          keyboardType={keyboardType}
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
