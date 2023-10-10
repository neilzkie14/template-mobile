import React, {useState, useContext} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import AnnouncementItem from './components/AnnouncementItem';
import {UserContext} from '../../../context/UserContext';
const {width} = Dimensions.get('screen');
export default function Announcement({}) {
  const userContext = useContext(UserContext);
  const [announcements, setAnnouncements] = useState([]);
  const {user} = userContext.data;

  return (
    <View style={{padding: 5}}>
      {announcements?.map((item, index) => {
        return (
          <AnnouncementItem
            key={index}
            date={item?.date}
            title={item?.title}
            message={item?.message}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({});
