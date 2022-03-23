import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import Student from '../../../api/Student';
import Header from '../../../components/Header';
import InputText from './components/InputText';

export default function AddStudent() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [schoolcode, setSchoolcode] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [birthDay, setBirthDay] = useState('');

  const addStudent = async () => {
    let response = await new Student().addStudent({
      code: '12345',
      student_no: '131009746',
      first_name: 'Jayhiel Vhon',
      last_name: 'Lopez',
      birthday: 'Dec 28, 1995',
    });
    if (response.ok) {
      alert('Successfully added student');
      console.log({response: response.data});
    } else {
      alert('something wen wrong in adding student');
      console.log({err: response.data});
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header />
      <View style={{flex: 1, padding: 10}}>
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
          <InputText
            label="Birthday"
            placeholder="Birthday"
            onChangeText={text => setBirthDay(text)}
          />
        </ScrollView>
      </View>
      <View>
        <TouchableOpacity onPress={() => addStudent()}>
          <Text>Add Student</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
