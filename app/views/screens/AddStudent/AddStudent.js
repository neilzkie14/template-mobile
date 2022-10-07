import React, {useState, useContext} from 'react';
import {View, ScrollView, TouchableOpacity, Text, Platform} from 'react-native';
import Student from '../../../api/Student';
import InputText from './components/InputText';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';
import {NavigationContext} from '@react-navigation/native';
import AddStudentHeader from './components/AddStudentHeader';
import {StudentContext} from '../../../context/StudentContext';

export default function AddStudent() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [schoolcode, setSchoolcode] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const navigation = useContext(NavigationContext);
  const studentContext = useContext(StudentContext);
  const {refreshStudent} = studentContext.data;

  const addStudent = async () => {
    if (
      firstname === '' ||
      lastname === '' ||
      schoolcode === '' ||
      studentNumber === '' ||
      birthDay === ''
    ) {
      return alert('Please fill up all the fields');
    }

    let response = await new Student().addStudent({
      code: schoolcode,
      student_no: studentNumber,
      first_name: firstname,
      last_name: lastname,
      birthday: moment(birthDay).format('MMMM DD, YYYY'),
    });
    if (response.ok) {
      alert('Successfully added student');
      console.log({response: response.data});
      refreshStudent();
      await navigation.goBack(null);
    } else {
      alert(response.data?.error || 'Something went wrong');
      console.log({err: response.data});
    }
  };

  return (
    <View style={{flex: 1}}>
      <AddStudentHeader previous={true} title={'Add Student'} />
      <View style={{flex: 1, padding: 20}}>
        <ScrollView>
          <InputText
            label="First Name"
            placeholder="First Name"
            onChangeText={text => setFirstname(text)}
          />
          <InputText
            label="Last Name"
            placeholder="Last Name"
            onChangeText={text => setLastname(text)}
          />
          <InputText
            label="School Code"
            placeholder="School Code"
            onChangeText={text => setSchoolcode(text)}
          />
          <InputText
            label="Student Number"
            placeholder="Student Number"
            onChangeText={text => setStudentNumber(text)}
          />
          <View style={{marginTop: 20}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#707070',
                marginBottom: 10,
              }}>
              {'Birthday'}
            </Text>
            <View
              style={{
                borderWidth: 1,
                borderColor: '#E9E9E9',
                borderRadius: 10,
                paddingHorizontal: 10,
                flexDirection: 'row',
                alignItems: 'center',
                padding: Platform.OS == 'ios' ? 15 : 10,
              }}>
              <View>
                <TouchableOpacity onPress={() => setOpen(true)}>
                  <Text style={{color: '#707070'}}>
                    {birthDay == ''
                      ? 'Select birthday'
                      : `${moment(birthDay).format('MMMM DD, YYYY')}`}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <DatePicker
            modal
            open={open}
            date={date}
            mode="date"
            onConfirm={date => {
              setOpen(false);
              setBirthDay(date);
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
        </ScrollView>
      </View>
      <View style={{padding: 20}}>
        <TouchableOpacity
          onPress={() => addStudent()}
          style={{
            backgroundColor: '#A3D063',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 15,
            borderRadius: 10,
          }}>
          <Text style={{fontSize: 15, color: '#fff'}}>Add Student</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
