import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions, NavigationContext} from '@react-navigation/native';
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from 'react-native';
import {UserContext} from '../../../context/UserContext';
import {StudentContext} from '../../../context/StudentContext';
import arrow from '../../../images/arrow.png';
import profile from '../../../images/profile.png';
import Chrildren from './components/Children';
import ChildInfomation from './components/ChildInformation';
export default function Settings() {
  const navigation = useContext(NavigationContext);
  const userContext = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const studentContext = useContext(StudentContext);
  const {setStudent, students, student, refreshStudent} = studentContext.data;
  const {refreshUser} = userContext.data;

  const showAlert = () => {
    Alert.alert(
      'Wait a minute!',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            confirmLogOut();
          },
        },
      ],
      'secure-text',
    );
  };

  const confirmLogOut = async () => {
    try {
      await AsyncStorage.removeItem('token');
      await AsyncStorage.clear();
      await navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'SplashScreen'}],
        }),
      );
    } catch (error) {
      console.log({error});
    }
  };

  console.log({student});

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          borderBottomWidth: 0.5,
          borderBottomColor: '#707070',
        }}>
        {/* <TouchableOpacity onPress={{}} style={{ position: 'absolute', height: 70, justifyContent: 'center', padding: 10, zIndex: 99 }}>
          <Image
            source={arrow}
            style={{
              height: 20,
              width: 20,
              tintColor: '#A3D063',
              transform: [{ rotate: '90deg' }],
            }}
            resizeMethod="resize"
          />
        </TouchableOpacity> */}
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#707070',
              fontWeight: 'bold',
              fontSize: 20,
              padding: 20,
            }}>
            {'Settings'}
          </Text>
        </View>
      </View>
      <View style={{justifyContent: 'space-between'}}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('UserInformation')}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 15,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16}}>Personal Information</Text>
            <View style={{padding: 5}}>
              <Image
                source={arrow}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: '#707070',
                  transform: [{rotate: '270deg'}],
                }}
                resizeMethod="resize"
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SecuritySettings')}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 15,
              paddingTop: 0,
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16}}>Security</Text>
            <View style={{padding: 5}}>
              <Image
                source={arrow}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: '#707070',
                  transform: [{rotate: '270deg'}],
                }}
                resizeMethod="resize"
              />
            </View>
          </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: 15}}>
          {students.length != 0 && (
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#aaa',
                paddingTop: 5,
              }}>
              <Text
                style={{fontSize: 16, color: '#707070', fontWeight: 'bold'}}>
                Children
              </Text>
              <View style={{paddingVertical: 10}}>
                {students?.map((item, key) => {
                  return (
                    <Chrildren
                      key={key}
                      item={item}
                      setShowModal={setShowModal}
                    />
                  );
                })}
              </View>
            </View>
          )}
          <View style={{paddingHorizontal: 5, marginBottom: 100}}>
            <TouchableOpacity
              onPress={() => showAlert()}
              style={{paddingTop: 20}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
