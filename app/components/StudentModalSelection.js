import {NavigationContext} from '@react-navigation/native';
import React, {useState, useEffect, useContext} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  RefreshControl,
  Platform,
} from 'react-native';
import Student from '../api/Student';
import {StudentContext} from '../context/StudentContext';
import Loader from './Loader';
const {width} = Dimensions.get('screen');

export default function StudentModalSelection({
  modalVisible,
  onRequestClose,
  onCloseModal,
  setShowModal,
  showModal,
}) {
  const [loading, setLoading] = useState(false);
  const navigation = useContext(NavigationContext);
  const studentContext = useContext(StudentContext);
  const {setStudent, students, student} = studentContext.data;

  return (
    <View>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <SafeAreaView style={{flex: 1}}>
          <View style={{padding: 10, flex: 1}}>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={() => getStudentList()}
                />
              }>
              <TouchableOpacity
                style={{
                  borderBottomWidth: 1,
                  borderBottomColor: '#f0f0f0',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      color: '#A3D063',
                      fontWeight: 'bold',
                      fontSize: 14,
                      width: width / 2,
                    }}
                    numberOfLines={1}>
                    Students
                  </Text>
                </View>
              </TouchableOpacity>
              <View style={{flex: 1, backgroundColor: '#fff', marginTop: 10}}>
                {students.length <= 0 ? (
                  <View style={{flex: 1, justifyContents: 'center'}}>
                    <Text>No Students</Text>
                  </View>
                ) : (
                  <View>
                    {students?.map((item, key) => {
                      return (
                        <View key={key} style={{padding: 5, }}>
                          <TouchableOpacity
                            onPress={() => {
                              setStudent(item);
                            }}
                            style={{
                              backgroundColor: student?.id == item?.id ? '#ecffd1' : '#fff',
                              shadowColor: '#000',
                              shadowOffset: {
                                width: 0,
                                height: 2,
                              },
                              shadowOpacity: 0.25,
                              shadowRadius: 3.84,

                              elevation: 5,
                              padding: 10,
                              borderRadius: 10,
                              marginBottom: 10,
                            }}>
                            <Text>{`Name: ${item?.user?.first_name} ${item?.user?.last_name}`}</Text>
                            <Text>{`Email: ${item?.user?.email}`}</Text>
                            <Text>{`Student Number: ${item?.student_no}`}</Text>
                          </TouchableOpacity>
                        </View>
                      );
                    })}
                  </View>
                )}
              </View>
            </ScrollView>
            <TouchableOpacity
              onPress={() => navigation.navigate('AddStudent')}
              style={{
                backgroundColor: '#A3D063',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 15,
                borderRadius: 10,
                marginBottom: 10,
              }}>
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 14}}>
                Add Student
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onCloseModal}
              style={{
                backgroundColor: 'gray',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 15,
                borderRadius: 10,
              }}>
              <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 14}}>
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
      {loading && <Loader />}
    </View>
  );
}
