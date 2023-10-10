import React, { useState } from 'react';
import { StyleSheet, Dimensions, View, Image, Text, TouchableOpacity } from 'react-native';
import moment from 'moment';
import arrow from '../../../../images/arrow.png'
import Modals from '../../../../components/LmsModal';
import { isEmpty } from 'lodash';

const { width, height } = Dimensions.get('screen');

export default function LmsItems({ item, key }) {
  const [showModal, setShowModal] = useState(false);

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

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 10,
          backgroundColor: '#FFF',
          borderBottomWidth: 1,
          borderBottomColor: 'gray'
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={{
              color: '#BCBCBC',
              fontSize: 12,
              paddingLeft: 10
            }}>
            {moment(item?.dateCreated).format('MM/DD/YY')}
          </Text>
          <Text style={{ color: '#707070', fontWeight: 'bold', fontSize: 15, paddingLeft: 10 }}>
            {item?.title}
          </Text>
        </View>
        <TouchableOpacity onPress={() => setShowModal(true)} style={{ padding: 5 }}>
          <Image
            source={arrow}
            style={{
              height: 15,
              width: 15,
              tintColor: '#707070',
              transform: [{ rotate: '270deg' }],
            }}
            resizeMethod="resize"
          />
        </TouchableOpacity>
      </View>
      <Modals
        modalVisible={showModal}
        data={item}
        onPress={() => setShowModal(!showModal)}
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </>
  );
};

const styles = StyleSheet.create({});

