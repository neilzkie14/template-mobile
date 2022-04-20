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
          <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: '#cccccc',
              borderRadius: 50,
            }}
          />
          {/* <Image source={profile_icon} resizeMode = 'contain' style = {{ width: 35, height: 35, tintColor: '#cccccc', }}/> */}
          <Text style={{marginLeft: 10, fontSize: 12, color: '#7d7d7d', width: width/2}}>
            {`${teacher} has assigned an `}
            <Text
              style={{color: '#ee9337', fontSize: 12}}
              >
              {test_type(type)}
            </Text>
          </Text>
        </View>
        <Text style={{fontSize: 12, color: '#7d7d7d', paddingRight: 10}}>
          2 hr. ago
        </Text>
      </View>
      <View style={{padding: 10}}>
        <Text style={{fontWeight: '500', color: '#000', fontSize: 12}}>
          {description}
        </Text>
      </View>
      <View style={{borderBottomWidth: 0.5, borderBottomColor: '#cccccc'}}>
        <View
          style={{
            padding: 10,
          }}>
          <TouchableOpacity
            style={{
              padding: 8,
              backgroundColor: '#ee9337',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
              View Activity
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={onPressLike}>
          {/* <Image
            source={likes}
            style={{
              width: width / 20,
              height: width / 20,
              tintColor: isLike ? '#2a98d4' : '#ee9337',
            }}
            resizeMode="contain"
          /> */}
          <Text
            style={{
              color: isLike ? '#2a98d4' : '#ee9337',
              fontWeight: 'bold',
              marginLeft: 5,
            }}>
            Like
          </Text>
          <Text
            style={{
              color: isLike ? '#2a98d4' : '#ee9337',
              fontWeight: 'bold',
              marginLeft: 5,
            }}>
            {`(${like?.length})`}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{flexDirection: 'row', alignItems: 'center'}}
          onPress={onCommentPress}>
          {/* <Image
            source={comment}
            style={{width: width / 20, height: width / 20}}
            resizeMode="contain"
          /> */}
          <Text style={{color: '#ee9337', fontWeight: 'bold', marginLeft: 5}}>
            Comment
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
