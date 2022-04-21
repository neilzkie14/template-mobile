import {NavigationContext} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {View, Text, ScrollView, Dimensions, Image} from 'react-native';
import {getParams} from '../../../../utils/navigation_helper';
import OntraqHeader from './OntraqHeader';
import OntraqSwitchComponent from './OntraqSwitchComponent';
const {width} = Dimensions.get('window');

export default function OntraqInOutScreen() {
  const navigation = useContext(NavigationContext);
  const params = getParams(navigation);
  const [active, setActive] = useState(0)
  console.log({params});

  const temp_data = [
    {
      location: 'Main Gate',
      time: [
        {
          timeIn: '7:30am',
          timOut: '4:30pm',
        },
        {
          timeIn: '7:30am',
          timOut: '4:30pm',
        },
      ],
    },
    {
      location: 'H.S. Left Wing - 2nd Floor',
      time: [
        {
          timeIn: '7:30am',
          timOut: '4:30pm',
        },
        {
          timeIn: '7:30am',
          timOut: '4:30pm',
        },
      ],
    },
    {
      location: 'Rm. 207',
      time: [
        {
          timeIn: '7:30am',
          timOut: '4:30pm',
        },
        {
          timeIn: '7:30am',
          timOut: '4:30pm',
        },
      ],
    },
    {
      location: 'Rm. 201',
      time: [
        {
          timeIn: '7:30am',
          timOut: '4:30pm',
        },
        {
          timeIn: '7:30am',
          timOut: '4:30pm',
        },
      ],
    },
  ];

  return (
    <View style={{flex: 1}}>
      <OntraqHeader
        onBackPress={() => navigation.goBack(null)}
        title={params.item.date}
      />
      <View style={{flex: 1, padding: 10}}>
      <OntraqSwitchComponent active= {active} setActive= {setActive}/>
        <ScrollView>
          <View>
            {temp_data.map((item, key) => {
              return (
                <View
                  style={{padding: 10, backgroundColor: '#fff', marginTop: 30}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderBottomColor: '#cccccc',
                      borderBottomWidth: 0.5,
                      padding: 5,
                    }}>
                    <Image
                      source={require('../../../../images/steps.png')}
                      style={{
                        width: width / 17,
                        height: width / 17,
                        tintColor: '#2E3192',
                      }}
                      resizeMode="contain"
                    />
                    <Text style={{marginLeft: 10}}>{item.location}</Text>
                  </View>
                  <View>
                    {item.time.map((item, key) => {
                      return (
                        <View style = {{ borderBottomWidth: 0.5, borderBottomColor: '#cccccc', padding: 5 }}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#C5C5C5',
                              fontWeight: '600',
                            }}>
                            {`${item.timeIn}  |  `}{' '}
                            <Text style={{color: '#2E3192', fontSize: 14}}>
                              {' '}
                              IN
                            </Text>
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#C5C5C5',
                              fontWeight: '600',
                            }}>
                            {`${item.timOut}  |  `}{' '}
                            <Text style={{color: 'red', fontSize: 14}}>
                              {' '}
                              OUT
                            </Text>
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
