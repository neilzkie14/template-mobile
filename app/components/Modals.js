import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  Linking
} from 'react-native';
import { DEV_API_URL } from '../constants';
const {width} = Dimensions.get('screen');

export default function Modals({
  modalVisible,
  onRequestClose,
  onCloseModal,
  data,
}) {

  const openURL = (url) => {
    Linking.openURL(url);
  };

  
  return (
    <View>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <SafeAreaView style={{flex: 1}}>
          <View style={{padding: 10, flex: 1}}>
            <ScrollView>
              <TouchableOpacity
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#f0f0f0',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: '#A3D063',
                      fontWeight: 'bold',
                      fontSize: 14,
                      width: width / 2,
                    }}
                    numberOfLines={1}>
                    Message
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={{flex: 1, backgroundColor: '#fff', marginTop: 10, marginBottom: 30}}>
                <Text> {data?.message?.content}</Text>
              </View>
              {data?.message?.attachment_path && (
                <TouchableOpacity onPress={() => openURL(DEV_API_URL + data?.message?.attachment_path)}>
                  <Text style={{color: 'blue'}}>Download Attachment </Text>
                </TouchableOpacity>
              )}
              
            </ScrollView>
            <TouchableOpacity
              onPress={onCloseModal}
              style={{
                backgroundColor: '#A3D063',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 15,
                borderRadius: 10,
              }}>
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 14}}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}
