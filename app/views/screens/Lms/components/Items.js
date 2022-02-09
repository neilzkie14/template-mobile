import React, {useState} from 'react';
import {TouchableOpacity, Text, View, StyleSheet, Image, Dimensions, TouchableWithoutFeedback} from 'react-native';
import arrowUp from '../../../../images/arrow-up-green.png'
import arrowDown from '../../../../images/arrow-down-green.png'
import paper from '../../../../images/paper.png'

const {width} = Dimensions.get('screen');

export default function Items({time, title}) {
  const [status, setStatus] = useState(false);
  return (
    <View style={{height: 50, width: width-10, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={{fontSize:14, color: '#BCBCBC', paddingLeft: 10, width: 70}}>{time}</Text>
        <Text style={{color: '#C5C5C5', fontSize: 20}}>|</Text>
      </View>
      <View>
        <Text style={{fontSize:15, color: '#707070', paddingLeft: 10, fontWeight: 'bold'}}>{title}</Text>
      </View>
      <TouchableWithoutFeedback onPress={() => alert('Under Development')}>
        <View style={{height: 30, width: 50, backgroundColor: '#2E3192', borderRadius: 5, justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 20}}>
          <Text style={{fontSize:15, color: '#fff'}}>View</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
});
