import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions, NavigationContext } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, Image, SafeAreaView, Modal } from 'react-native';
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

            <Text
              style={{
                color: '#707070',
                fontWeight: '100',
                fontSize: 16,
                padding: 20,
              }}
            >
              {user?.email}
            </Text>
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
            <Text
              style={{
                color: '#707070',
                fontWeight: '100',
                fontSize: 16,
                padding: 20
              }}
            >
              {user?.contact_number}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}
