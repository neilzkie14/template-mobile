import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions, NavigationContext } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, Image, SafeAreaView, TextInput } from 'react-native';
import Loader from '../../../../components/Loader';
import arrow from '../../../../images/arrow.png'
import { UserContext } from '../../../../context/UserContext';
import { getParams } from '../../../../utils/navigation_helper';
export default function UserInformation({ }) {
  const navigation = useContext(NavigationContext);
  const [loading, setLoading] = useState(false);
  const userContext = useContext(UserContext);
  const params = getParams(navigation);
  const { user } = userContext.data;
  const [email, setEmail] = useState(user?.email);
  const [mobileNumber, setMobileNumber] = useState(user?.contact_number);

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          backgroundColor: '#FFFFFF',
          borderBottomWidth: 0.5,
          borderBottomColor: '#707070'
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', height: 70, justifyContent: 'center', padding: 10, zIndex: 99 }}>
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
        </TouchableOpacity>
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
              padding: 20
            }}
          >
            {'Personal Information'}
          </Text>
        </View>
      </View>
      <View style={{ justifyContent: 'space-between', backgroundColor: '#fff', flex: 1 }}>
        <View>

          <View
            style={{
              backgroundColor: '#fff',
              flexDirection: 'row'
            }}>
            <Text
              style={{
                color: '#707070',
                fontSize: 16,
                padding: 20
              }}
            >
              Email:
            </Text>
            <TextInput
              value={email}
              placeholder={'Enter email here'}
              onChangeText={text => setEmail(text)}
              style={{ borderBottomColor: 'gray', borderBottomWidth: 0.5, flex: 1, marginRight: 20  }}
          />
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              flexDirection: 'row'
            }}>
            <Text
              style={{
                color: '#707070',
                fontSize: 16,
                padding: 20
              }}
            >
              Contact:
            </Text>
            <TextInput
              value={mobileNumber}
              placeholder={'Enter mobile number here'}
              onChangeText={text => setMobileNumber(text)}
              style={{ borderBottomColor: 'gray', borderBottomWidth: 0.5, flex: 1, marginRight: 20  }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}
