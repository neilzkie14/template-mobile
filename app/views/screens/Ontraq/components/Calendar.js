import {NavigationContext} from '@react-navigation/native';
import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity, Dimensions, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
const {width, height} = Dimensions.get('window');

export default function Calendar() {
  const [month, setMonth] = useState(new Date().getMonth());
  const [year, setYear] = useState(new Date().getFullYear());
  const [openMonth, setOpenMonth] = useState(false);
  const [openDays, setOpenDays] = useState(false);
  const navigation = useContext(NavigationContext);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
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
  const last_date = new Date(year, month + 1, 0).getDate();
  const days = [...Array(last_date).keys()].map(i => i + 1);
  return (
    <View>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            backgroundColor: openMonth ? '#fff' : '#2e3192',
            paddingVertical: 10,
          }}>
          <TouchableOpacity
            onPress={() => setYear(year - 1)}
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../../../../images/calendar_arrow.png')}
              resizeMode="contain"
              style={{
                width: width / 25,
                height: width / 25,
                transform: [{rotateY: '180deg'}],
                tintColor: openMonth ? '#2e3192' : '#fff',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {setOpenMonth(!openMonth), setOpenDays(false)}}
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontWeight: 'bold',
                color: openMonth ? '#2e3192' : '#fff',
                fontSize: 20,
                // tintColor: '#2e3192',
              }}>
              {year}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setYear(year + 1)}
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image
              source={require('../../../../images/calendar_arrow.png')}
              resizeMode="contain"
              style={{width: width / 25, height: width / 25, tintColor: openMonth ? '#2e3192' : '#fff'}}
            />
          </TouchableOpacity>
        </View>
        {openMonth && 
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            backgroundColor: '#fff',
            padding: 5
          }}>
          {months.map((item, key) => {
            return (
              <TouchableOpacity
                onPress={() => {setMonth(key), setOpenDays(true)}}
                key={key}
                style={{
                  width: width / 4,
                  height: width / 15,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginTop: 10,
                  borderRadius: 3,
                  backgroundColor: month == key ? '#fafafa' : '#fff',
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '600',
                    color: month == key ? '#2e3192' : '#707070',
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        }
      </View>
      {openMonth && openDays &&
        <View style = {{ height: height/1.9 }}>
          <ScrollView>
            <View>
              {days.map((item, key) => {
                const tempDate = new Date(year, month, item);
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('OntraqInOutScreen', {
                        item: tempDate.toDateString(),
                      })
                    }
                    key={key}
                    style={{
                      padding: 20,
                      alignItems: 'center',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      borderBottomWidth: 0.5,
                      borderColor: '#cccccc',
                      backgroundColor: '#fff',
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{fontWeight: '700', fontSize: 15}}>
                        {tempDate.toDateString()}
                      </Text>
                    </View>
                    <Image
                      source={require('../../../../images/arrow-up.png')}
                      resizeMode="contain"
                      style={{
                        width: width / 17,
                        height: width / 17,
                        tintColor: '#707070',
                        transform: [{rotate: '90deg'}],
                      }}
                    />
                  </TouchableOpacity>
                );
              })}
            </View>
          </ScrollView>
        </View>
      }
    </View>
  );
}
