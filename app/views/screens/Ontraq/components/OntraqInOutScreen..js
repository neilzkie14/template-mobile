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

export default function OntraqInOutScreen() {
  const navigation = useContext(NavigationContext);
  const params = getParams(navigation);
  const [active, setActive] = useState(0);
  const studentContext = useContext(StudentContext);
  const {student} = studentContext.data;
  const [attendances, setAttendances] = useState([]);
  const [room, setRoom] = useState([]);
  const [loading, setLoading] = useState(false);

  const getStudentAttendance = async () => {
    if (student != null) {
      setLoading(true);
      let response = await new Student().getStudentAttendance(student?.id);
      if (response.ok) {
        console.log({response});
        const attendances = response?.data?.venue_attendances.filter(item => {
          return (
            moment(item?.created_at).format('YYYY-MM-DD') ==
            moment(params.item).format('YYYY-MM-DD')
          );
        });

        let data = attendances?.map(item => item?.venue);
        setAttendances(attendances);
        let uniqueData = [];
        data.forEach(item => {
          let isUnique = true;
          uniqueData.forEach(uniqueItem => {
            if (uniqueItem?.id == item?.id) {
              isUnique = false;
            }
          });
          if (isUnique) {
            uniqueData.push(item);
          }
        });
        console.log({uniqueData});
        setRoom(uniqueData);
      } else {
        alert('Something went wrong in fetching student attendance');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudentAttendance();
  }, [student]);

  return (
    <View style={{flex: 1,}}>
      <OntraqHeader
        onBackPress={() => navigation.goBack(null)}
        title={params.item}
      />
      <View style={{flex: 1, padding: 10, backgroundColor: '#fff', marginTop: 5}}>
        <ScrollView>
          <View>
            {room?.length <= 0 ? (
              <View
              style={{
                padding: 30,
                backgroundColor: '#fff',
                marginTop: 30,
                borderRadius: 10,
                borderWidth: StyleSheet.hairlineWidth,
                borderColor: 'gray'
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
                        marginTop: 30,
                        borderRadius: 10,
                        borderWidth: StyleSheet.hairlineWidth,
                        borderColor: 'gray'
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
