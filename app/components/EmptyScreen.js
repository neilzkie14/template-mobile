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
import sad from '../images/sad.png';
import {UserContext} from '../context/UserContext';

const {width, height} = Dimensions.get('screen');
export default function EmptyScreen({
  page
}) {
  const userContext = useContext(UserContext);
  const {user} = userContext.data;

  return (
    <View style={{alignItems: 'center', justifyContent: 'center', height: height * 0.7}}>
        <Image resizeMode='contain' source={sad} style={{height: 65, width: 65}} />
        <Text style={{ textAlign: 'center', marginTop: 20, color: '#C5C5C5', fontSize: 17}}>Sorry! You have no existing subscription to {`\n${page}`} </Text>
        <TouchableWithoutFeedback onPress={() => alert('Under Development')}>
          <Text style={{ textAlign: 'center', marginTop: 40, color: '#A3D063', fontSize: 17}}>Please contact your school administrator</Text>
        </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
});
