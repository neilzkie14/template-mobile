import moment from 'moment';
import React from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
// const exam_icon = require('../../../../../../assets/Image/exam_icon.png');
// const exam_right = require('../../../../../../assets/Image/exam_feed_right.png');
// const likes = require('../../../../../../assets/Image/like.png');
// const comment = require('../../../../../../assets/Image/comment.png');
// const profile_icon = require('../../../../../../assets/Image/reading-book.png')
const {width, height} = Dimensions.get('screen');

export default function FeedAnnouncement({
  teacher,
  type,
  description,
  dateCreated,
  like,
  setLike,
  onCommentPress,
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
        marginTop: 10,
        backgroundColor: '#fff'
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomWidth: 0.5,
          borderBottomColor: '#cccccc',
          padding: 5,
          justifyContent: 'space-between',
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 5,
          }}>
          {/* <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: '#cccccc',
              borderRadius: 50,
            }}
          /> */}
          <Image source={require('../../../../images/profile.png')} resizeMode = 'contain' style = {{ width: 35, height: 35, tintColor: '#cccccc', }}/>
          <Text style={{marginLeft: 10, fontSize: 12, color: '#7d7d7d', width: width/2}}>
            {`${teacher} has assigned an `}
            <Text
              style={{color: '#2E3192', fontSize: 16, fontWeight: 'bold'}}
              >
              {test_type(type)}
            </Text>
          </Text>
        </View>
        <Text style={{fontSize: 12, color: '#2E3192', paddingRight: 10}}>
        {moment(dateCreated).startOf().fromNow()}
        </Text>
      </View>
      <View style={{padding: 10}}>
        <Text style={{fontWeight: '500', color: '#A3D063', fontSize: 20,}}>
          {description}
        </Text>
      </View>
      {/* <View style={{borderBottomWidth: 0.5, borderBottomColor: '#cccccc'}}>
        <View
          style={{
            padding: 10,
          }}>
          <TouchableOpacity
            style={{
              padding: 8,
              backgroundColor: '#2E3192',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
              View Activity
            </Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </View>
  );
}
