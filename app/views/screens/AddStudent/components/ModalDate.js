import React, {useState} from 'react';
import {
  Alert,
  Modal,
  Text,
  Pressable,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const {width} = Dimensions.get('screen');
export default function ModalDate({modalVisible, onRequestClose}) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      }}>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
            backgroundColor: 'rgba(0,0,0,0.6)',
            flex: 1
          }}>
         <Text>asd</Text>
        </View>
      </Modal>
    </View>
  );
}
