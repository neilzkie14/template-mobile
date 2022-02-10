import React, {useState} from 'react';
import {TouchableOpacity, Text, View, StyleSheet, Image, Dimensions, TouchableWithoutFeedback} from 'react-native';
import arrowUp from '../../../../images/arrow-up-green.png'
import arrowDown from '../../../../images/arrow-down-green.png'
import stepsGreen from '../../../../images/steps-green.png'
import Items from './Items';

const {width} = Dimensions.get('screen');

export default function DailyDropdownList({title}) {
  const [status, setStatus] = useState(true);
  const [grade, setGrade] = useState([
    {
      time: '8:00 AM',
      title: 'Grade 1 - Faith',
      label: 'IN'
    },
    {
      time: '12:00 PM',
      title: 'Grade 1 - Faith',
      label: 'OUT'
    },
    {
      time: '8:00 AM',
      title: 'Grade 1 - Humility',
      label: 'IN'
    },
    {
      time: '12:00 PM',
      title: 'Grade 1 - Humility',
      label: 'OUT'
    },
  ]
  );
  return (
    <View style={{marginBottom: status ? 0 : 5}}>
      <View
        style={{
          height: 'auto',
        }}>
        <TouchableOpacity onPress={() => setStatus(!status)}>          
          <View style={[styles.container,  {marginBottom: status ? 5 : 0}]}>
            <Image resizeMode='contain' source={stepsGreen} style={{height: 30, width: 30, marginLeft: 20}} />
            <View>
              <Text style={{fontSize:17, color: '#A3D063', paddingLeft: 10, fontWeight: 'bold'}}>{title}</Text>
            </View>
          </View>
        </TouchableOpacity>
          <View style={{backgroundColor: '#fff', display: status ? 'none' : 'flex', paddingLeft: 10}}>
            <View style={{}}>
              {grade?.map((item, index) => {
                return (
                  <Items time={item?.time} title={item?.title} label={item?.label} />
                );
              })}
            </View>
          </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 50,
     width: width-10,
     backgroundColor: '#fff',
     flexDirection: 'row',
     alignItems: 'center',
    //  justifyContent: 'space-between'
  },
  fontBold: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});
