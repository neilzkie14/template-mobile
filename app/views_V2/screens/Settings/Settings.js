import AsyncStorage from '@react-native-community/async-storage';
import {CommonActions, NavigationContext, useRoute} from '@react-navigation/native';
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
import Chrildren from '../Settings/components/Children';
import ChildInfomation from './components/ChildInformation';
import Man from '../../../images/man_icon.png'
import Lock from '../../../images/lock_icon.png'
import { FloatingAction } from "react-native-floating-action";


export default function Settings() {
  const navigation = useContext(NavigationContext);
  const userContext = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const studentContext = useContext(StudentContext);
  const {setStudent, students, student, refreshStudent} = studentContext.data;
  const {refreshUser} = userContext.data;

  const route = useRoute();
  console.log(route.name);
  let screenName = route.name;

  const actions = [
    {
      text: "Announcement",
      icon: require("../../../images/megaphone-green.png"),
      name: "bt_announcement",
      position: 2,
    },
    {
      text: "LMS",
      icon: require("../../../images/book-green.png"),
      name: "bt_lms",
      position: 1
    },
    {
      text: "Ontraq",
      icon: require("../../../images/steps-green.png"),
      name: "bt_Ontraq",
      position: 3
    },
    {
      text: "Wallet",
      icon: require("../../../images/wallet.png"),
      name: "bt_wallet",
      position: 4
    },
    {
      text: "Settings",
      icon: require("../../../images/settings2.png"),
      name: "bt_settings",
      position: 5
    }
  ];

  const actionWithoutHome = [
    {
      text: "Announcement",
      icon: require("../../../images/megaphone-green.png"),
      name: "bt_announcement",
      position: 2,
    },
    {
      text: "Ontraq",
      icon: require("../../../images/steps-green.png"),
      name: "bt_Ontraq",
      position: 3
    },
    {
      text: "LMS",
      icon: require("../../../images/book-green.png"),
      name: "bt_lms",
      position: 1
    },
    {
      text: "Wallet",
      icon: require("../../../images/wallet.png"),
      name: "bt_wallet",
      position: 4
    },

  ]

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
      <ScrollView contentContainerStyle={{justifyContent: 'space-between'}}>
        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('UserInformation')}
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 15,
              alignItems: 'center',
              borderRadius: 5,
              backgroundColor: '#A3D063',
              height: 50,
              marginVertical: 10,
              marginRight: 10,
              marginLeft: 10
            }}>
               <View>
              <Image
                source={Man}
                style={{
                  height: 20,
                  width: 15,
                  tintColor: '#FFFFFF',
                }}
                resizeMethod="resize"
                resizeMode="contain"
              />
            </View>
            <Text style={{fontSize: 16, color: '#707070', color: 'white', fontWeight: 'bold',marginRight: 120}}>Personal Information</Text>
            <View style={{padding: 5}}>
              <Image
                source={arrow}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: '#FFFFFF',
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
              borderRadius: 5,
              backgroundColor: '#A3D063',
              height: 50,
              marginVertical: 10,
              marginRight: 10,
              marginLeft: 10
            }}>
              <View>
              <Image
                source={Lock}
                style={{
                  height: 20,
                  width: 15,
                  marginTop: 12,
                  tintColor: '#FFFFFF',
                }}
                resizeMethod="resize"
                resizeMode="contain"
              />
            </View>
            <Text style={{fontSize: 16, color: '#707070', color: 'white', marginTop: 12, fontWeight: 'bold',marginRight: 220}}>Security</Text>
            <View style={{padding: 5}}>
              <Image
                source={arrow}
                style={{
                  height: 20,
                  width: 20,
                  marginTop: 12,
                  tintColor: '#FFFFFF',
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
              <Text style={{fontSize: 16, fontWeight: 'bold', color: '#707070'}}>Log out</Text>
            </TouchableOpacity>
          </View>
        </View>

        <FloatingAction
          actions={screenName != 'Settings' ? actions : actionWithoutHome}
          onPressItem={name => {
            console.log(`selected button: ${name}`)
            if(name === 'bt_announcement'){
            navigation.navigate('Home')
            }else if(name === 'bt_lms'){
              alert(`selected button: ${name}`);
            }else if(name === 'bt_ontraq'){
              navigation.navigate('Home');
            }else if(name === 'bt_wallet'){
              navigation.navigate('OntraqWallet');
            }else if(name === 'bt_settings'){
              navigation.navigate('Settings');
            }
          }}
          color='#A3D063'
          shadow={{
            shadowOpacity: 0.35, shadowOffset: { width: 0, height: 5 }, shadowColor: "#000000", shadowRadius: 3 
          }}
          textBackground={'#A3D063'}
          visible={true}
        />
      </ScrollView>
    </View>
  );
}
