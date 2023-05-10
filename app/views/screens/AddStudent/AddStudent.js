import React, {useState, useContext} from 'react';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import Student from '../../../api/Student';
import InputText from './components/InputText';
import {NavigationContext} from '@react-navigation/native';
import AddStudentHeader from './components/AddStudentHeader';
import {StudentContext} from '../../../context/StudentContext';

export default function AddStudent() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [schoolcode, setSchoolcode] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const navigation = useContext(NavigationContext);
  const studentContext = useContext(StudentContext);
  const {refreshStudent} = studentContext.data;

  const addStudent = async () => {
    if (
      firstname === '' ||
      lastname === '' ||
      schoolcode === '' ||
      studentNumber === ''
    ) {
      return alert('Please fill up all the fields');
    }

    let response = await new Student().addStudent({
      code: schoolcode,
      student_no: studentNumber,
      first_name: firstname,
      last_name: lastname,
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
