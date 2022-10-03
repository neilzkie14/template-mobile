import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions, NavigationContext } from '@react-navigation/native';
import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView, Image, SafeAreaView, Modal } from 'react-native';
import Loader from '../../../../components/Loader';
import arrow from '../../../../images/arrow.png'
import { getParams } from '../../../../utils/navigation_helper';
export default function ChildInformation({ }) {
  const navigation = useContext(NavigationContext);
  const [loading, setLoading] = useState(false);
  const params = getParams(navigation);

  const handleRemoveChild = async data => {
    alert(JSON.stringify(data))
    // const response = await new Auth().register({user: data});
    // setLoader(true);
    // if (response.ok) {
    //   await AsyncStorage.setItem('token', response.data.token);
    //   await refreshUser();
    //   await refreshStudent();
    //   await navigation.replace('Dashboard');
    // } else {
    //   alert(response?.data?.errors?.join('\n'));
    // }
    // setLoader(false);
  };

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
            {`${params?.item?.user?.first_name} ${params?.item?.user?.last_name}`}
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: 'space-between', backgroundColor: '#F5F5F5' }}>
        <View>

          <View
            style={{
              // justifyContent: 'center',
              backgroundColor: '#fff',
              marginTop: 50,
              flexDirection: 'row'
            }}>
            <Text
              style={{
                color: '#707070',
                fontSize: 16,
                padding: 20
              }}
            >
              Name:
            </Text>

            <Text
              style={{
                color: '#707070',
                fontWeight: '100',
                fontSize: 16,
                padding: 20
              }}
            >
              {`${params?.item?.user?.first_name} ${params?.item?.user?.last_name}`}
            </Text>
          </View>
          {/* <View
            style={{
              justifyContent: 'space-between',
              backgroundColor: '#fff',
              marginTop: 50,
              flexDirection: 'row'
            }}>
            <Text
              style={{
                color: '#707070',
                fontSize: 16,
                padding: 20
              }}
            >
              LMS
            </Text>
            <TouchableOpacity onPress={() => alert('Under Development')}>
              <Text
                style={{
                  color: '#A3D063',
                  fontWeight: '400',
                  fontSize: 16,
                  padding: 20
                }}
              >
                connect
              </Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
      <View style={{ padding: 5 }}>
        <TouchableOpacity
          onPress={() => handleRemoveChild(params?.item?.user?.id)}
          style={{
            padding: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 5,
            backgroundColor: '#2E3192',
          }}>
          <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff' }}>
            Remove Child
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
