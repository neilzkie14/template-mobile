import React, {useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import profile from '../images/profile.png';
import arrow from '../images/arrow.png';
import {UserContext} from '../context/UserContext';
import {StudentContext} from '../context/StudentContext';
import {NavigationContext} from '@react-navigation/native';

const {width} = Dimensions.get('screen');
export default function Header({lmsID,schoolID,setLmsID=()=>{},setSchoolID=()=>{}}) {
  const userContext = useContext(UserContext);
  const studentContext = useContext(StudentContext);
  const {student} = studentContext.data;
  const navigation = useContext(NavigationContext);
  const {user} = userContext.data;
  
  return (
    <View style={{padding: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff'}}>
      <View style={{padding: 5}}>
        <Image
          source={profile}
          style={{width: width / 10, height: width / 10}}
          resizeMode="contain"
        />
      </View>
      <View style={{marginLeft: 10}}>
        <Text
          style={{
            fontWeight: '700',
            color: '#707070',
            fontSize: 14,
            paddingLeft: 10
          }}>
        { `${user?.first_name} ${user?.last_name}`}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('StudentSelection', {
            lmsID,
            schoolID,
            setLmsID,
            setSchoolID,
          })}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            backgroundColor: '#fff',
            borderRadius: 50,
            paddingHorizontal: 10,
            alignItems: 'center',
          }}>
          
          {student == null || student == ''
            ? <Text style={{fontSize: 12, color: '#f01', fontWeight: '500', textDecorationLine:'underline' }}>
              No Student Selected!
            </Text>
            : <Text style={{fontSize: 12, color: '#A3D063', fontWeight: '500'}}>
              {`${student?.user?.first_name}  ${student?.user?.last_name}`}
            </Text>
          }
          <Image
            source={arrow}
            resizeMode="contain"
            style={{width: width / 30, height: width / 30, marginLeft: 20}}
          />
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
