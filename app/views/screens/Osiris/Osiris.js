import React, {useEffect, useContext, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import LmsStudentAPI from '../../../api/Lms';
import Header from '../../../components/Header';
import {StudentContext} from '../../../context/StudentContext';
import TermItem from './components/TermItem';

export default function Osiris() {
  const studentContext = useContext(StudentContext);
  const {student, refreshStudent} = studentContext.data;

  const [classes, setClasses] = useState([]);
  const [terms, setTerms] = useState([]);

  const getClasses = async () => {
    let response = await new LmsStudentAPI().getClasses(
      student.user.lms_id,
      student.user.lms_school_code,
    );
    if (response.ok) {
      let data = response.data;
      setClasses(data);
    } else {
      alert('Student is not registered to LMS');
    }
  };

  const getTerms = async () => {
    let response = await new LmsStudentAPI().getTerms(
      student.user.lms_school_code,
    );
    if (response.ok) {
      let data = response.data;
      console.log({data});
      setTerms(data);
    } else {
      alert('Student is not registered to LMS');
    }
  };

  useEffect(() => {
    if (student != null) {
      console.log({student});
      getClasses();
      getTerms();
    }
  }, [student]);

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <Header />
        <ScrollView>
      <View style={{padding: 12}}>
      <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>Report Card</Text>
      {student.user.lms_id && (
          <View>
            <ScrollView horizontal>
              <View s>
                <View style={{flexDirection: 'row'}}>
                  <View style={styles.cell}>
                    <Text>Class</Text>
                  </View>
                  {terms.map((item, index) => {
                    return (
                      <View
                        style={[
                          styles.cell,
                          {width: 100, textAlign: 'center'},
                        ]}>
                        <Text>{item.description}</Text>
                      </View>
                    );
                  })}
                </View>
                {classes.map((classItem, index) => {
                  return (
                    <View style={{flexDirection: 'row'}}>
                      <View style={styles.cell}>
                        <Text>{classItem.className}</Text>
                      </View>
                      {terms.map((term, index) => {
                        return (
                          <TermItem
                            style={styles.cell}
                            key={index}
                            classId={classItem.id}
                            studentId={student.user.lms_id}
                            termId={term.id}
                            lms_school_code={student.user.lms_school_code}
                          />
                        );
                      })}
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
      )}
      </View>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  cell: {
    borderWidth: 1,
    width: 200,
  },
});
