import {NavigationContext} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Header from '../../../components/Header';
import Calendar from './components/Calendar';
const {width, height} = Dimensions.get('window');

export default function Index() {
  const navigation = useContext(NavigationContext);
  const [toggleCalendar, setToggleCalendar] = useState(false);
  const temp_data = [
    {
      date: 'April 01',
      day: 'Monday',
    },
    {
      date: 'April 01',
      day: 'Monday',
    },
    {
      date: 'April 01',
      day: 'Monday',
    },
  ];
  return (
    <View style={{flex: 1}}>
      <Header />
      <View style={{padding: 10, flex: 1}}>
         <Calendar onPress={() => setToggleCalendar(!toggleCalendar)}/>
      </View>
    </View>
  );
}
