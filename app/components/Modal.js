import React, {useContext, useEffect, useState} from 'react';
import {Text, TouchableOpacity, View, Dimensions, Image} from 'react-native';
import megaphone from '../images/megaphone-green.png'
const {width, height} = Dimensions.get('screen');

export default function Modal({
  part,
  title,
  message,
  date,
  closeModal = () => {},
}) {

  const handleClose = () => {
      closeModal();
  };

  return (
    <View style={{flex: 1, paddingTop: width * .2}}>
      <View style={{ backgroundColor: '#fff'}}>
        <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 25, height: 55}}>
          <View>
            <Image style={{height: 30, width: 30}} resizeMode='contain' source={megaphone} />
          </View>
          <View style={{marginLeft: 20}}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>{title}</Text>
          </View>
          <View style={{ paddingLeft: 10, justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 10}}>
            <Text style={{fontSize:14, color: '#BCBCBC'}}>{date}</Text>
          </View>
        </View>
        <View style={{ alignItems: 'center', marginHorizontal: 25, paddingBottom: 10}}>
          <Text style={{color:'#707070', fontSize: 15}}>{message}</Text>
        </View>
        <View style={{flexDirection: 'row', paddingBottom: 5, width: width - 60, alignSelf: 'center'}}>
          <TouchableOpacity
            style={{
              height: 30,
              backgroundColor: '#2E3192',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
              margin: 4,
              flex: 1,
            }}
            onPress={handleClose}>
            <Text style={{color: '#fff', fontSize: 15}}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
