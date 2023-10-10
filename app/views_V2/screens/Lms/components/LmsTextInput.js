import React from 'react'
import {View, Text, TextInput} from 'react-native'

export default function LmsTextInput({label,placeholder,onChangeText, value}) {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', paddingRight: 10}}>
    <Text style={{marginRight: 10, paddingLeft: 10, width: '30%', fontWeight: '500'}}>{`${label}:`}</Text>
    <TextInput
      onChangeText={onChangeText}
      placeholder={placeholder}
      value = {value}
      style={{
        borderBottomWidth: 0.5,
        borderBottomColor: '#cccccc',
        padding: 10,
        flex: 1,
      }}
    />
  </View>
  )
}
