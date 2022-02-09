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
import megaphone from '../images/megaphone.png';
import book from '../images/book.png';
import steps from '../images/steps.png';
import megaphoneGreen from '../images/megaphone-green.png';
import bookGreen from '../images/book-green.png';
import stepsGreen from '../images/steps-green.png';
import {UserContext} from '../context/UserContext';

const {width} = Dimensions.get('screen');
export default function Footer({
}) {
  const userContext = useContext(UserContext);
  const {user} = userContext.data;

  return (
    <View style={{height: 80, width: width, position: 'absolute', bottom: 0, backgroundColor: '#A3D063'}}>
      <View style={{flexDirection: 'row', width: '100%', backgroundColor: '#fff', justifyContent: 'space-between'}}>
        <View style={{height: width * .2, width: width * .2, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
            <Image resizeMode='contain' source={megaphone} style={{height: 35, width: 35}} />
            <Text style={{fontSize: 10}}>Announcements</Text>
        </View>
        <View style={{height: width * .2, width: width * .2, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
            <Image resizeMode='contain' source={book}  style={{height: 35, width: 35}} />
            <Text style={{fontSize: 10}}>LMS</Text>
        </View>
        <View style={{height: width * .2, width: width * .2, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}}>
            <Image resizeMode='contain' source={steps} style={{height: 35, width: 35}} />
            <Text style={{fontSize: 10}}>OnTraQ</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
});