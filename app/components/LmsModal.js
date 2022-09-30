import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  Linking,
  Image,
} from 'react-native';
import arrow from '../images/arrow.png'
import profile from '../images/profile.png'
import moment from 'moment';
const { width } = Dimensions.get('screen');

export default function Modals({
  modalVisible,
  onRequestClose,
  onCloseModal,
  data,
  onPress
}) {

  const openURL = (url) => {
    Linking.openURL(url);
  };

  const test_type = type => {
    switch (type) {
      case 1:
        return 'Announcement';
      case 2:
        return 'Assignment';
      case 3:
        return 'Task';
      case 4:
        return 'Exam';
      case 5:
        return 'Interactive';
      default:
        break;
    }
  };

  console.log({data})
  return (
    <View>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <ScrollView>
              <View
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#f0f0f0',
                  padding: 10
                }}>
                <TouchableOpacity onPress={onPress} style={{position: 'absolute', height: 50, justifyContent: 'center', padding: 5, zIndex: 99}}>
                  <Image
                    source={arrow}
                    style={{
                      height: 20,
                      width: 20,
                      tintColor: '#A3D063',
                      transform: [{ rotate: '90deg' }],
                    }}
                    resizeMethod="resize"
                  />
                </TouchableOpacity>
                <View
                  style={{
                    justifyContent: 'center',
                    flex: 1,
                    // backgroundColor: 'red'
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: '#A3D063',
                      fontWeight: 'bold',
                      fontSize: 20,
                    }}
                  >
                    {data?.title}
                  </Text>
                </View>
              </View>
              <View style={{padding: 20}}>
                <View style={{flexDirection: 'row', alignItems: 'center' }}>
                  <View>
                  <Image
                      source={profile}
                      style={{
                        height: 50,
                        width: 50,
                        borderRadius: 25,
                        tintColor: '#A3D063',
                      }}
                      resizeMethod="resize"
                    />
                  </View>
                  <View style={{paddingHorizontal: 10}}>
                    <Text style={{color: '#707070', fontSize: 16}}>{data?.updatedBy}</Text>
                    <Text style={{color: '#707070', fontSize: 12}}>{moment(data?.dateCreated).format('MM/DD/YY')}</Text>
                  </View>

                </View>
                <View style={{ flex: 1, backgroundColor: '#fff', marginTop: 10, marginBottom: 30 }}>
                  <Text> {data?.description}</Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}
