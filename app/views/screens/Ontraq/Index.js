import { NavigationContext } from '@react-navigation/native';
import React, {useContext} from 'react';
import {View, Text, ScrollView, Image, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../../../components/Header';
const {width, height} = Dimensions.get('window');

export default function Index() {
  const navigation = useContext(NavigationContext)
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
  return (
    <View style={{flex: 1}}>
      <Header />
      <View style={{padding: 10}}>
        <ScrollView>
          <View>
            {temp_data.map((item, key) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate('OntraqInOutScreen', {item: item})}
                  key={key}
                  style={{
                    padding: 20,
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    borderBottomWidth: 0.5,
                    borderColor: '#cccccc',
                  }}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text style = {{ fontWeight: '700', fontSize: 15 }}>{item.date}</Text>
                    <Text style = {{ fontWeight: '700', fontSize: 15 }}>, {item.day}</Text>
                  </View>

                  <Image
                    source={require('../../../images/arrow-up.png')}
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
    </View>
  );
}
