import React, {useState, useEffect, useContext} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
} from 'react-native';
import {CommonActions, NavigationContext} from '@react-navigation/native';
const {width} = Dimensions.get('screen');
import arrow from '../../../../images/arrow.png';
import profile from '../../../../images/profile.png';

export default function Chrildren({item, setShowModal, key}) {
  const navigation = useContext(NavigationContext);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ChildInformation', {item: item})}
      key={key}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingLeft: 16,
        alignItems: 'center',
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={profile}
          style={{
            height: 20,
            width: 20,
            tintColor: '#A3D063',
            marginRight: 10,
          }}
          resizeMethod="resize"
        />
        <Text
          style={{
            fontSize: 16,
          }}>{`${item?.user?.first_name} ${item?.user?.last_name}`}</Text>
      </View>
      <View style={{padding: 5}}>
        <Image
          source={arrow}
          style={{
            height: 20,
            width: 20,
            tintColor: '#707070',
            transform: [{rotate: '270deg'}],
          }}
          resizeMethod="resize"
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
