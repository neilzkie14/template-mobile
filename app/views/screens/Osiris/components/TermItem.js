import React, {useState, useEffect} from 'react'
import {View, Text} from 'react-native'
import LmsStudentAPI from '../../../../api/Lms';
export default function TermItem({style, studentId, termId, classId, lms_school_code}) {
  console.log({studentId, termId, classId})

  const [gpa, setGpa] = useState(0)

  const getGpa = async() => {
    let response = await new LmsStudentAPI().getGpa(
      studentId, classId, termId,
      lms_school_code,
    );
    if (response.ok) {
      let data = response.data;
      console.log({data});
      setGpa(data)

    } else {
      console.log("unable to get gpa")
    }
  }

  useEffect(() => {
    getGpa()
  }, [])
  
  

  return (
    <View style={[style, {width: 100}]}>
      {/* {(gpa.grades || []).map((item, index) => {
        return (
          <Text style={{textAlign: 'right', paddingRight: 12}}>{`${item.gradeType.description} (${item.gradeType.percentage}%) : ${item.studentGrade?.percentage || 0}`}</Text>
        )
      })} */}
      <TotalGPA grades={gpa?.grades} />
    </View>
  )
}

const TotalGPA = ({grades}) => {
  // let total = 0
  
  const gpa = (grades || []).reduce((total, item) => {
    return total + ((item?.gradeType?.percentage * (item?.studentGrade?.percentage || 0)) / 100)
  }, 0)
  return (
    <Text style={{textAlign: 'right', paddingRight: 12, fontWeight: 'bold'}}>{gpa}%</Text>
  )
}