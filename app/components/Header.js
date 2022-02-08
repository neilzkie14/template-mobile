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
import profile from '../images/profile.png';
import eye_closed_img from '../images/eye-hide.png';
import {UserContext} from '../context/UserContext';

const {width} = Dimensions.get('screen');
export default function Header({
}) {
  const userContext = useContext(UserContext);
  const {user} = userContext.data;

  return (
    <View style={{flexDirection: 'row', width: '100%', backgroundColor: '#fff', justifyContent: 'space-between'}}>
        <View style={{height: width * .2, width: width * .2, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
            <Image source={profile} style={{height: 50, width: 50, borderRadius: 25}} />
        </View>
        <View style={{flexDirection: 'column', alignSelf: 'center', justifyContent: 'center', width: width * .6}}>
          <View style={{height: 25, flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: 12, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, color: '#fff', padding: 4, textAlign: 'left', backgroundColor: '#2E3192'}}>Parent of Tercela Parayno {` `}
            </Text>
              <TouchableWithoutFeedback onPress={() => alert('Under Development!')}>
                <View style={{ backgroundColor: '#2E3192', height: 24, width: 20, justifyContent: 'center', borderTopEndRadius: 10, borderBottomEndRadius: 10}}>
                  <View style={{height: 10, width: 10, borderRadius: 5, backgroundColor: '#A3D063', marginLeft: 3}} />
                </View>
              </TouchableWithoutFeedback>
          </View>
          <Text style={{fontSize: 20, color: '##707070'}}>Gil Christian Parayno</Text>
        </View>
        <View style={{height: width * .2, width: width * .2, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
            <Image source={eye_closed_img} style={{height: 50, width: 50, borderRadius: 25, backgroundColor: '#A3D063'}} />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
});