import AsyncStorage from '@react-native-community/async-storage';
import React, {useState, useContext,useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  ScrollView,
} from 'react-native';
import LmsStudentAPI from '../../../api/Lms';
import Loader from '../../../components/Loader';
import ModalPrompt from '../../../components/ModalPrompt';
import {StudentContext} from '../../../context/StudentContext';
import {UserContext} from '../../../context/UserContext';
import LmsTextInput from './components/LmsTextInput';

export default function Lms({}) {
  const userContext = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const {user} = userContext.data;
  const studentContext = useContext(StudentContext);
  const {student, refreshStudent} = studentContext.data;
  const [studentNumber, setStudentNumber] = useState('131008741');
  const [fName, setFName] = useState('jayhiel vhon');
  const [lName, setLName] = useState('lopez');
  const [mName, setMName] = useState('middle name');
  const [sex, setSex] = useState('male');
  const [citizenship, setCitizenship] = useState('filipino');
  const [permanentAddress, setPermanentAddress] = useState('asdasd');
  const [presentAddress, setPresentAddress] = useState('asdasd');
  const [bday, setBday] = useState('2022-04-12T03:39:16.736Z');
  const [contactNumber, setContactNumber] = useState('09281751434');
  const [emailAddress, setEmailAddress] = useState('vhon.lopez.idio@gmail.com');
  const [mothersFname, setMothersFname] = useState('asdasd');
  const [mothersLname, setMothersLname] = useState('sdf');
  const [fathersFname, setFathersFname] = useState('dfgdfg');
  const [fathersLname, setFathersLname] = useState('asdasd');
  const [emergencyContactNumber, setEmergencyContactNumber] =
    useState('09281751434');
  const [showModal, setShowModal] = useState(false);
  const [schoolcode, setSchoolcode] = useState('');

  console.log({student});

  const onRegister = async () => {
    if (
      studentNumber == '' &&
      fName == '' &&
      lName == '' &&
      mName == '' &&
      sex == '' &&
      citizenship == '' &&
      permanentAddress == '' &&
      presentAddress == '' &&
      bday == '' &&
      contactNumber == '' &&
      emailAddress == '' &&
      mothersFname == '' &&
      mothersLname == '' &&
      fathersFname == '' &&
      fathersLname == '' &&
      emergencyContactNumber == ''
    ) {
      alert('Please fill the missing fields');
    } else {
      register();
      refreshStudent();
    }
  };

  const register = async () => {
    setLoading(false);
    await AsyncStorage.setItem('school-code', schoolcode.toLowerCase());
    let data = {
      username: 'sampleuser007',
      password: 'Password@123',
      // qrCode: 'samplestudent999',
      student: {
        studentNo: studentNumber,
        fname: fName,
        lname: lName,
        mname: mName,
        sex: sex,
        citizenship: citizenship,
        permanentAddress: permanentAddress,
        presentAddress: presentAddress,
        bday: bday,
        contactNo: contactNumber,
        emailAdd: emailAddress,
        mothersFname: mothersFname,
        mothersLname: mothersLname,
        fathersFname: fathersFname,
        fathersLName: fathersLname,
        emergencyContactNo: emergencyContactNumber,
      },
    };

    let response = await new LmsStudentAPI().register(data);
    if (response.ok) {
      await AsyncStorage.setItem('uniqueID', `${response?.data?.userAccountID}`);
      await updateQR(response?.data?.userAccountID)
    } else {
      alert(response.data.errorMessage);
    }
    setLoading(false);
    setShowModal(!showModal);
  };

  const updateQR = async (id) => {
    let response = await new LmsStudentAPI().updateQR(id)
    if(response.ok){
      console.log({RESPONSE: response.data})
    }else{
      console.log({ERROR: response?.data?.errorMessage})
    }
  }

  const HandleModal = () => {
    if (schoolcode == '') {
      alert('Enter School Code');
    } else {
      onRegister();
    }
  };

  useEffect(() => {
    refreshStudent()
  }, [student])
  

  return (
    <View style = {{flex: 1 }}>
      {student != null ? (
        <View style={{padding: 5, flex: 1}}>
          <View style={{backgroundColor: '#fff'}}>
            <ScrollView>
              <View>
                <Text style={{padding: 10, fontSize: 18, color: '#000'}}>LMS</Text>
                <LmsTextInput
                  label={'Student number'}
                  placeholder={'Enter here...'}
                  onChangeText={text => setStudentNumber(text)}
                  value = {studentNumber}
                />
                <LmsTextInput
                  label={'First name'}
                  placeholder={'Enter here...'}
                  onChangeText={text => setFName(text)}
                  value = {fName}
                />
                <LmsTextInput
                  label={'Last name'}
                  placeholder={'Enter here...'}
                  onChangeText={text => setLName(text)}
                  value = {lName}
                />
                <LmsTextInput
                  label={'Middle Name'}
                  placeholder={'Enter here...'}
                  onChangeText={text => setMName(text)}
                  value = {mName}
                />
                <LmsTextInput
                  label={'Sex'}
                  placeholder={'Enter here...'}
                  onChangeText={text => setSex(text)}
                  value = {sex}
                />
                <LmsTextInput
                  label={'Citizenship'}
                  placeholder={'Enter here...'}
                  onChangeText={text => setCitizenship(text)}
                  value = {citizenship}
                />
                <LmsTextInput
                  label={'Permanent Address'}
                  placeholder={'Enter here...'}
                  onChangeText={text => setPermanentAddress(text)}
                  value = {permanentAddress}
                />
                <LmsTextInput
                  label={'Present Address'}
                  placeholder={'Enter here...'}
                  onChangeText={text => setPresentAddress(text)}
                  value = {presentAddress}
                />
                <LmsTextInput
                  label={'Birthday'}
                  placeholder={'Enter here...'}
                  onChangeText={text => setBday(text)}
                  value = {bday}
                />
                <LmsTextInput
                  label={'Contact #'}
                  placeholder={'Enter here...'}
                  onChangeText={text => setContactNumber(text)}
                  value = {contactNumber}
                />
                <LmsTextInput
                  label={'Email Address'}
                  placeholder={'Enter here...'}
                  onChangeText={text => setEmailAddress(text)}
                  value = {emailAddress}
                />
                <LmsTextInput
                  label={'Mothers first name'}
                  placeholder={'Enter here...'}
                  onChangeText={text => setMothersFname(text)}
                  value = {mothersFname}
                />
                <LmsTextInput
                  label={'Mothers last name'}
                  placeholder={'Enter here...'}
                  onChangeText={text => setMothersLname(text)}
                  value = {mothersLname}
                />
                <LmsTextInput
                  label={'Fathers first name'}
                  placeholder={'Enter here...'}
                  onChangeText={text => setFathersFname(text)}
                  value = {fathersFname}
                />
                <LmsTextInput
                  label={'Fathers last name'}
                  placeholder={'Enter here...'}
                  onChangeText={text => setFathersLname(text)}
                  value = {fathersLname}
                />
                <LmsTextInput
                  label={'Emergency #'}
                  placeholder={'Enter here...'}
                  onChangeText={text => setEmergencyContactNumber(text)}
                  value = {emergencyContactNumber}
                />
              </View>
            </ScrollView>
          </View>
          <TouchableOpacity
            onPress={() => setShowModal(!showModal)}
            style={{
              backgroundColor: '#2e3192',
              padding: 15,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Text style={{color: '#fff', fontSize: 14, fontWeight: 'bold'}}>
              Connect
            </Text>
          </TouchableOpacity>
          {loading && <Loader />}
          {showModal && (
            <ModalPrompt
              onPressShowModal={() => setShowModal(true)}
              onPress={() => HandleModal()}
              onRequestClose={() => setShowModal(!showModal)}
              modalVisible={showModal}
              onChangeText={text => setSchoolcode(text)}
              placeholder={'School Code'}
            />
          )}
        </View>
      ) : (
        <View>
          <Text>this is feed</Text>
        </View>
      )}
    </View>
  );
}
