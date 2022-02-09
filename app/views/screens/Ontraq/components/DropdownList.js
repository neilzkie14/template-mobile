import React, {useState} from 'react';
import {TouchableOpacity, Text, View, StyleSheet, Image, Dimensions, TouchableWithoutFeedback} from 'react-native';
import arrowUp from '../../../../images/arrow-up.png'
import arrowDown from '../../../../images/arrow.png'
import DailyDropdownList from './DailyDropdownList';
import Items from './Items';

const {width} = Dimensions.get('screen');

export default function DropdownList({title}) {
  const [status, setStatus] = useState(true);
  const [grade, setGrade] = useState([
    {
      section: 'Grade 1 - Faith',
      info:
        [{
        assignments: [
          {
            time: '8:00 AM',
            title: 'Assignment #1',
          },
          {
            time: '12:00 PM',
            title: 'Exam #1',
          },
        ],
        exams: [
          {
            time: '1:30 PM',
            title: 'Assignment #1',
          },
        ]}
        ],
    },
    {
      section: 'Grade 1 - Humility',
      info:
        [{
        assignments: [],
        exams: [
          {
            time: '1:30 PM',
            title: 'Assignment #1',
          },
        ]}
        ],
    }]
  );
  return (
    <View style={{marginBottom: status ? 0 : 5}}>
      <View
        style={{
          height: 'auto',
        }}>
        <TouchableOpacity onPress={() => setStatus(!status)}>          
          <View style={[styles.container,  {marginBottom: status ? 5 : 5}]}>
            <View>
              <Text style={{fontSize:17, color: '#fff', paddingLeft: 10, fontWeight: 'bold'}}>{title}</Text>
            </View>
            <View style={{height: 32, width: 32, justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 20}}>
              <Image resizeMode='contain' source={status ? arrowDown : arrowUp} style={{height: 20, width: 20}} />
            </View>
          </View>
        </TouchableOpacity>
        <DailyDropdownList title={'Tuesday, December 21'} />
        <DailyDropdownList title={'Wednesday, December 22'} />
        <DailyDropdownList title={'Thursday, December 23'} />
        <DailyDropdownList title={'Friday, December 24'} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
     width: width-10,
     backgroundColor: '#A3D063',
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'center'
  },
  fontBold: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});
