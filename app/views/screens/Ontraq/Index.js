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
import LiteUserText from '../../../components/LiteUserText';
import { UserContext } from '../../../context/UserContext';
import Calendar from './components/Calendar';
import OntraqInOutScreen from './components/OntraqInOutScreen.';
const {width, height} = Dimensions.get('window');

export default function Index() {
  const navigation = useContext(NavigationContext);
  const [toggleCalendar, setToggleCalendar] = useState(false);
  const [liteUser, setLiteUser] = useState(true);
  const userContext = useContext(UserContext);
  const {user} = userContext.data;
  return (
    <View style={{flex: 1}}>
      <Header />
      {user?.access_type === 'lite' ? 
        <LiteUserText />
      :
      <View style={{padding: 10, flex: 1}}>
         <Calendar onPress={() => setToggleCalendar(!toggleCalendar)}/>
         {/* <OntraqInOutScreen /> */}
      </View>
      }
    </View>
  );
}
