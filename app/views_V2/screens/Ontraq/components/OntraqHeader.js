import React from 'react';
import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
const {width} = Dimensions.get('window');

export default function OntraqHeader({title, onBackPress}) {
  return (
    <View
      style={{
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'space-between',
      }}>
      <TouchableOpacity onPress={onBackPress}>
        <Image
          source={require('../../../../images/arrow-up.png')}
          resizeMode="contain"
          style={{
            width: width / 17,
            height: width / 17,
            tintColor: '#707070',
            transform: [{rotate: '270deg'}],
          }}
        />
      </TouchableOpacity>

      <Text style={{fontWeight: '700'}}>{title}</Text>
      <View style={{width: width / 17, height: width / 17}} />
    </View>
  );
}
