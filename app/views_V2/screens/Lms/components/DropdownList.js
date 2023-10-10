import React, {useState} from 'react';
import {TouchableOpacity, Text, View, StyleSheet, Image, Dimensions, TouchableWithoutFeedback} from 'react-native';
import arrowUp from '../../../../images/arrow-up-green.png'
import arrowDown from '../../../../images/arrow-down-green.png'
import paper from '../../../../images/paper.png'
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
          <View style={[styles.container,  {marginBottom: status ? 5 : 0}]}>
            <View>
              <Text style={{fontSize:17, color: '#A3D063', paddingLeft: 10, fontWeight: 'bold'}}>{title}</Text>
            </View>
            <View style={{height: 32, width: 32, justifyContent: 'center', marginRight: 10}}>
              {/* <Image resizeMode='contain' source={status ? arrowDown : arrowUp} style={{height: 20, width: 20}} /> */}
              <View style={{backgroundColor: '#A3D063', height: 32, width: 32, borderRadius: 16, alignItems: 'center', justifyContent :'center' }}>
                <Text style={{fontSize: 17, color: '#fff'}}>3</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {grade?.map((item, index) => {
            return (
              <View style={{backgroundColor: '#fff', display: status ? 'none' : 'flex', paddingLeft: 10}}>
                <View style={{flexDirection: 'row', height: 30, alignItems: 'center'}}>
                  <Image resizeMode='contain' source={paper} style={{height: 30, width: 30}} />
                  <Text style={{fontSize: 17, color: '#707070', marginLeft: 10, fontWeight: 'bold'}}>{item?.section}</Text>
                </View>
                {item?.info.map((item, index) => {
                  return (
                    <>
                      <View style={{display: item?.assignments.length > 0 ? 'flex' : 'none'}}>
                        <View style={{height: 'auto',
                          justifyContent: 'center',
                          borderWidth: 1,
                          borderBottomColor: '#707070',
                          borderLeftColor: 'white',
                          borderRightColor: 'white',
                          borderTopColor: 'white'}}>
                          <Text style={{fontSize:17, color: '#A3D063', padding: 10}}>Assignment</Text>
                        </View>
                        {item?.assignments?.map((item, index) => {
                          return (
                            <Items time={item?.time} title={item?.title} />
                          );
                        })}
                      </View>
                      <View  style={{display: item?.exams.length > 0 ? 'flex' : 'none'}}>
                        <View style={{height: 'auto',
                          justifyContent: 'center',
                          borderWidth: 1,
                          borderBottomColor: '#707070',
                          borderLeftColor: 'white',
                          borderRightColor: 'white',
                          borderTopColor: 'white'}}>
                          <Text style={{fontSize:17, color: '#A3D063', padding: 10}}>Exam</Text>
                        </View>
                        {item?.exams?.map((item, index) => {
                          return (
                            <Items time={item?.time} title={item?.title} />
                          );
                        })}
                      </View>
                    </>
                  );
                })}
              </View>
            );
          })}
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
     justifyContent: 'space-between'
  },
  fontBold: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});
