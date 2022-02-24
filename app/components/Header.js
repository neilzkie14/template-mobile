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
  // ScrollView,
} from 'react-native';
import profile from '../images/profile.png';
import menu from '../images/menu.png';
import arrow from '../images/arrow.png';
import arrowUp from '../images/arrow-up.png';
import {UserContext} from '../context/UserContext';
import ChildName from './ChildName';
import { ScrollView } from 'react-native-gesture-handler';

const {width} = Dimensions.get('screen');
export default function Header({
}) {
  const userContext = useContext(UserContext);
  const {user} = userContext.data;
  const [parentDropdown, setParentDropdown] = useState(false);

  return (
    <View style={{flexDirection: 'row', width: '100%', backgroundColor: '#fff', justifyContent: 'space-between', zIndex: 99}}>
        <TouchableWithoutFeedback onPress={() => alert('Under Development!')}>
          <View style={{height: width * .2, width: width * .2, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
              <Image source={profile} style={{height: 50, width: 50, borderRadius: 25}} />
          </View>
        </TouchableWithoutFeedback>
        <View style={{flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', width: width * .6}}>
          <View style={{height: 25, flexDirection: 'row', alignItems: 'center', zIndex: 2}}>
            <View style={{ backgroundColor: parentDropdown ? '#A3D063' : '#2E3192', borderRadius: 10}}>
              <TouchableWithoutFeedback onPress={() => setParentDropdown(!parentDropdown)}>
                <View style={{flexDirection:'row'}}>
                  <Text style={{ width: width * .5, fontSize: 12, color: '#fff', padding: 4, textAlign: 'left',  borderRadius: 10}}>Parent of Tercela Parayno {` `}
                  </Text>
                  <View style={{ justifyContent: 'center', position: 'absolute', right: 5, alignSelf: 'center'}}>
                    <Image resizeMode='contain' source={ parentDropdown ? arrowUp : arrow} style={{height: 10, width: 10}} />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
            <View elevation={10} style={{maxHeight: 190, borderRadius: 10, paddingTop: 15, top: 10, width: width * .5, position: 'absolute', backgroundColor: '#fff', zIndex: 1, display: parentDropdown ? 'flex' : 'none'}}>
              <ScrollView>
                <ChildName name='Angel Parayno' />
                <ChildName name='Angel Parayno' />
                <ChildName name='Angel Parayno' />
                <ChildName name='Angel Parayno' />
                <ChildName name='Angel Parayno' />
                <ChildName name='Angel Parayno' />
              </ScrollView>
              <View style={{backgroundColor: '#A3D063', height: 30, justifyContent: 'center', margin: 2, borderRadius: 10}}>
                <Text style={{ textAlign: 'center', color: '#fff'}}>+ Add Child</Text>
              </View>
            </View>
          <Text style={{fontSize: 20, color: '#707070'}}>Gil Christian Parayno</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => alert('Under Development!')}>
          <View style={{height: width * .2, width: width * .2, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
              <Image resizeMode='contain' source={menu} style={{height: 30, width: 30}} />
          </View>
        </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
});