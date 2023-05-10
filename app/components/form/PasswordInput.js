import React, {useState} from 'react';
import {useController} from 'react-hook-form';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
const {width, height} = Dimensions.get('screen');

export default function PasswordInput({
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
  const [showPassword, setShowPassword] = useState(true);

  const error = errors[name];

  return (
    <View style={{marginVertical: 10, }}>
      <View
        style={{
          borderWidth: 0.5,
          borderColor: error != null ? 'red' : '#E9E9E9',
          borderRadius: 10,
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <TextInput
          value={field.value}
          placeholder={placeholder}
          secureTextEntry={showPassword}
          style={{flex: 1, padding: Platform.OS == 'ios' ? 15 : 10, color: '#000'}}
          onChangeText={field.onChange}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Image
            source={
              showPassword
                ? require('../../images/eye.png')
                : require('../../images/eye-hide.png')
            }
            style={{width: width / 15, height: width / 15}}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      {error != null && (
        <Text style={{color: 'red', fontSize: 12}}>
          {formatErrorMessage(error)}
        </Text>
      )}
    </View>
  );
}
