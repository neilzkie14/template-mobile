import React, {useContext, useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import Student from '../../../api/Student';
import Header from '../../../components/Header';
import Loader from '../../../components/Loader';
import {StudentContext} from '../../../context/StudentContext';
import Ontraq from '../Ontraq/Ontraq';

export default function Home() {
  const studentContext = useContext(StudentContext);
  const {student} = studentContext.data;
  const [loading, setLoading] = useState(false);
  const [room, setRoom] = useState([]);
  const [attendances, setAttendances] = useState([]);
  console.log({student});

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
            if(uniqueItem?.id == item?.id){
              isUnique = false;
            }
          })
          if(isUnique){
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

  useEffect(() => {
    getStundentAttenance();
  }, [student]);

  return (
    <View style={{flex: 1, marginBottom: 60}}>
      <Header />
      <ScrollView>
        <View>
          {
            room.length <= 0 ? (
              <View>
                <Text>No Data Available</Text>
              </View>
            ) : (
              <View>
                {
                  room.map((item, key) => {
                    console.log({DITO: item})
                    return(
                      <View key={key} style={{marginBottom: 12}}>
                        <Text>{item.name}</Text>
                        <View>
                          {attendances.filter(attendance => attendance.venue.id == item.id).map((attendance, key) => {
                            return(
                              <View key = {key}>
                                <Text>{attendance.attendance_status}</Text>
                                <Text>{attendance.created_at}</Text>
                              </View>
                            )
                          })}
                        </View>
                      </View>
                    )
                  })
                }
              </View>
            )
          }
        </View>
      </ScrollView>
      {loading && <Loader />}
    </View>
  );
}
