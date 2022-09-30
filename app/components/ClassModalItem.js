import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import moment from 'moment';
const { width } = Dimensions.get('screen');
export default function ClassModalItem({
  teacher,
  type,
  description,
  examCode,
  startDurationDate,
  startDurationTime,
  endDurationDate,
  endDurationTime,
  like,
  onCommentPress,
  dateCreated,
  onPressLike,
  isLike,
}) {
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
    <View
      style={{
        borderWidth: 0.5,
        borderColor: '#cccccc',
        borderRadius: 10,
        backgroundColor: '#fff'
      }}>
      {/* <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 0.5,
          borderBottomColor: '#cccccc',
          padding: 10,
          justifyContent: 'space-between',
          backgroundColor: '#2E3192'
        }}>

        <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
          {moment(startDurationDate).format('MMMM D, YYYY')}
        </Text>
      </View> */}
      <View style={{ padding: 10 }}>
        <View>
          <Text style={{ color: '#A3D063', fontSize: 16, fontWeight: 'bold' }}>
            {`${description} `}
          </Text>
          <Text style={{ color: '#707070', fontSize: 16, fontWeight: 'bold' }}>
            {`${teacher} `}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 16, color: '#707070', fontWeight: 'bold' }}>
              {moment(startDurationDate).format('h:mm a')}{' - '}
            </Text>
            <Text style={{ fontSize: 16, color: '#707070', fontWeight: 'bold' }}>
              {moment(endDurationDate).format('h:mm a')}
            </Text>
          </View>
          <Text style={{ color: '#707070', fontSize: 16, fontWeight: 'bold' }}>
            {moment(startDurationDate).format('MMMM D, YYYY')}
          </Text>
        </View>
      </View>
    </View>
  );
}
