import {NavigationContext} from '@react-navigation/native';
import React, {useContext, useState, useEffect} from 'react';
import {View, Text, ScrollView, Dimensions, Image} from 'react-native';
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
  console.log({params});

  const getStundentAttenance = async () => {
    if (student != null) {
      setLoading(true);
      let response = await new Student().getStudentAttendance(student?.id);
      if (response.ok) {
        console.log({response});
        let data = response?.data?.venue_attendances?.map(item => item?.venue);
        setAttendances(response?.data?.venue_attendances);
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
        setRoom(uniqueData);
      } else {
        alert('Something went wrong in fetching student attendance');
      }
      setLoading(false);
    }
  };

  // const sampledata = () => {
  //   created_at >= selectedDate && created_at <= selectedDate + 1.day
  //   let temp_room = room.filter(item =>moment(item.created_at).format('MMMM Do YYYY, h:mm:ss a') == moment(params.item).format('MMMM Do YYYY, h:mm:ss a'))
  //   return console.log({temp_room})
  // }

  useEffect(() => {
    getStundentAttenance();
  }, [student]);

  return (
    <View style={{flex: 1}}>
      {/* <OntraqHeader
        onBackPress={() => navigation.goBack(null)}
        title={params.item}
      /> */}
      <View style={{flex: 1, padding: 10}}>
        {/* <OntraqSwitchComponent active={active} setActive={setActive} /> */}
        <ScrollView>
          <View>
            {room?.length <= 0 ? (
              <View style = {{ padding: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Text>No Entry</Text>
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
                                      fontWeight: '600',
                                    }}>
                                    {`${moment(item.created_at).format(
                                      'MMMM DD YYYY, h:mm:ss a',
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
                                      fontWeight: '600',
                                    }}>
                                    {`${moment(item.created_at).format(
                                      'MMMM DD YYYY, h:mm:ss a',
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
      {
        loading && <Loader/>
      }
    </View>
  );
}
