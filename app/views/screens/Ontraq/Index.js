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
      <View style={{padding: 10}}>
        {/* {!toggleCalendar && (
          <TouchableOpacity
            onPress={() => setToggleCalendar(!toggleCalendar)}
            style={{
              padding: 10,
              backgroundColor: '#2E3192',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
            }}>
            <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 14}}>
              sample date
            </Text>
          </TouchableOpacity>
        )}
        {toggleCalendar && <Calendar onPress={() => setToggleCalendar(!toggleCalendar)}/>}
        */}
         <Calendar onPress={() => setToggleCalendar(!toggleCalendar)}/>
      </View>
    </View>
  );
}
