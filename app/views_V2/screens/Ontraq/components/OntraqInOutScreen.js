import {NavigationContext} from '@react-navigation/native';
import React, {useContext, useState, useEffect} from 'react';
import {View, Text, ScrollView, Dimensions, Image, StyleSheet} from 'react-native';
import {getParams} from '../../../../utils/navigation_helper';
import OntraqHeader from './OntraqHeader';
import OntraqSwitchComponent from './OntraqSwitchComponent';
import Student from '../../../../api/Student';
import {StudentContext} from '../../../../context/StudentContext';
import moment from 'moment';
import Loader from '../../../../components/Loader';
const {width} = Dimensions.get('window');

export default function OntraqInOutScreen({room, attendances}) {
  const navigation = useContext(NavigationContext);
  const params = getParams(navigation);
  const [active, setActive] = useState(0);
  const studentContext = useContext(StudentContext);
  const {student} = studentContext.data;
  const [loading, setLoading] = useState(false);

  return (
    <View style={{flex: 1,}}>
      <View style={{flex: 1, padding: 10, backgroundColor: '#fff', marginTop: 5}}>
        <ScrollView>
          <View>
            {room?.length <= 0 ? (
              <View
              style={{
                padding: 30,
                backgroundColor: '#fff',
                marginTop: 10,
                borderRadius: 10,
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: 'gray',
                marginBottom: 10
              }}>
                <Text style={{textAlign: 'center',fontWeight: 'bold', color: '#000', fontSize: 12}}>
                  No Entries
                </Text>
              </View>
            ) : (
              <View>
                {room?.map((item, key) => {
                  return (
                    <View
                      key={key}
                      style={{
                        padding: 10,
                        backgroundColor: '#fff',
                        marginTop: 10,
                        borderRadius: 10,
                        borderWidth: StyleSheet.hairlineWidth,
                        borderColor: 'gray',
                        marginBottom: 50
                      }}>
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
                        <Text style={{marginLeft: 10}}>{item?.name}</Text>
                      </View>
                      <View>
                        {attendances
                          .filter(attendance => attendance.venue.id == item.id)
                          .map((item, key) => {
                            console.log({item});
                            return (
                              <View
                                key={key}
                                style={{
                                  borderBottomWidth: 0.5,
                                  borderBottomColor: '#cccccc',
                                  padding: 5,
                                }}>
                                {item?.attendance_status == 'time_in' ? (
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      color: '#C5C5C5',
                                    }}>
                                    {`${moment(item.created_at).format(
                                      'h:mm A',
                                    )}  |  `}{' '}
                                    <Text
                                      style={{color: '#2E3192', fontSize: 14}}>
                                      {' '}
                                      IN
                                    </Text>
                                  </Text>
                                ) : (
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      color: '#C5C5C5',
                                    }}>
                                    {`${moment(item.created_at).format(
                                      'h:mm A',
                                    )}  |  `}{' '}
                                    <Text style={{color: 'red', fontSize: 14}}>
                                      {' '}
                                      OUT
                                    </Text>
                                  </Text>
                                )}
                              </View>
                            );
                          })}
                      </View>
                    </View>
                  );
                })}
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      {loading && <Loader />}
    </View>
  );
}
