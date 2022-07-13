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
import menu from '../images/menu.png';
import arrow from '../images/arrow.png';
import arrowUp from '../images/arrow-up.png';
import {UserContext} from '../context/UserContext';
import StudentModalSelection from './StudentModalSelection';
import {StudentContext} from '../context/StudentContext';

const {width} = Dimensions.get('screen');
export default function Header({}) {
  const userContext = useContext(UserContext);
  const studentContext = useContext(StudentContext);
  const {student} = studentContext.data;
  const [showModal, setShowModal] = useState(false);
  const {user} = userContext.data;
  
  return (
    <View style={{padding: 10, flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff'}}>
      <View>
        <Image
          source={profile}
          style={{width: width / 10, height: width / 10}}
          resizeMode="contain"
        />
      </View>
      <View style={{marginLeft: 10}}>
        <TouchableOpacity
          onPress={() => setShowModal(!showModal)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            backgroundColor: '#fff',
            borderRadius: 50,
            paddingHorizontal: 5,
            alignItems: 'center',
          }}>
          
            {student == null || student == ''
              ? 
              <Text style={{fontSize: 12, color: '#000', fontWeight: '500'}}>
                No student Selected
              </Text>
              : 
              <>
                <Text style={{fontSize: 12, color: '#000', fontWeight: '500'}}>
              {`Parent of `}
              </Text>
              <Text style={{fontSize: 12, color: '#A3D063', fontWeight: '500'}}>
              {`${student?.user?.first_name}  ${student?.user?.last_name}`}
                </Text>
              </>
              }
          <Image
            source={arrow}
            resizeMode="contain"
            style={{width: width / 30, height: width / 30, marginLeft: 20}}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontWeight: '700',
            color: '#707070',
            fontSize: 14,
          }}>{`${user?.first_name} ${user?.last_name}`}</Text>
      </View>
      <StudentModalSelection
        onCloseModal={() => setShowModal(!showModal)}
        modalVisible={showModal}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
