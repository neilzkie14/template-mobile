import React, {useContext, useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity, RefreshControl} from 'react-native';
import Student from '../../../api/Student';
import Header from '../../../components/Header';
import Loader from '../../../components/Loader';
import {StudentContext} from '../../../context/StudentContext';
import moment from 'moment';
import {AccordionList} from 'accordion-collapse-react-native';

export default function Home() {
  const studentContext = useContext(StudentContext);
  const {student} = studentContext.data;
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState([]);
  const [attendances, setAttendances] = useState([]);

  const getStundentAttenance = async () => {
    if (student != null) {
      setLoading(true);
      let response = await new Student().getStudentAttendance(student?.id);
      if (response.ok) {
        // console.log({response})
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

  const _head = (item, index, isExpanded) => {
    console.log({HEAD: item});
    return (
      <View
        style={{
          backgroundColor: isExpanded ? 'blue' : '#fff',
          marginTop: 10,
          padding: 10,
          borderRadius: 10,
          borderRadius: 5,
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: isExpanded ? '#fff' : 'blue',
          }}>
          {item?.name}
        </Text>
      </View>
    );
  };

  const _body = item => {
    let displayRoom = attendances.filter(
      attendance => attendance.venue.id == item.id,
    );
    return (
      <View style={{padding: 10}}>
        {displayRoom?.map((item, key) => {
          return (
            <View
              key={key}
              style={{
                padding: 20,
                borderRadius: 10,
                backgroundColor: '#fff',
                marginBottom: 10,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,

                elevation: 5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  backgroundColor:
                    item.attendance_status == 'time_in' ? 'green' : 'red',
                  padding: 10,
                  color:
                    item.attendance_status == 'time_in' ? '#fff' : '#fff',
                  borderRadius: 10,
                  fontWeight: 'bold',
                }}>
                {item.attendance_status == 'time_in'
                  ? 'TIME IN'
                  : 'TIME OUT'}
              </Text>
              <Text style={{fontSize: 16, color: '#000'}}>
                {moment(item.created_at).format(
                  'MMMM DD YYYY, h:mm:ss a',
                )}
              </Text>
            </View>
          );
        })}
      </View>
    );
  };

  useEffect(() => {
    getStundentAttenance();
  }, [student]);

  return (
    <View style={{flex: 1, marginBottom: 60}}>
      <Header />
      <ScrollView refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => getStundentAttenance()}
          />
        }>
        <View>
          {room.length <= 0 ? (
            <View>
              <Text>No Data Available</Text>
            </View>
          ) : (
            <ScrollView>
              <View style={{padding: 10}}>
                <AccordionList
                  list={room}
                  header={_head}
                  body={_body}
                  expandedKey={0}
                />
              </View>
            </ScrollView>
          )}
        </View>
      </ScrollView>
      {loading && <Loader />}
    </View>
  );
}
