import React, { useContext, useState } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { NavigationContext } from '@react-navigation/native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {StudentContext} from '../../../context/StudentContext';
import Student from '../../../api/Student';

export default function QrScanner() {
  const navigation = useContext(NavigationContext);
  const studentContext = useContext(StudentContext);
  const {refreshStudent} = studentContext.data;
  const [qrData, setQrData] = useState('');

  const handleScan = async e => {
    if (e) {
      setQrData(e?.data);
      verifyQRCode(e?.data);
  }
  };

  const verifyQRCode = async qr_code => {
    
    let data = {
      "qr_code": qr_code,
    }
    let response = await new Student().addStudentByQr(data);
    // alert(JSON.stringify(response));
    if(response?.ok){
      alert('Successfully added student');
      refreshStudent();
      navigation.goBack(null);
    } else {
      alert(response?.data?.error)
    }
  };

  return (
      <View style={{flex: 1}}>
        <QRCodeScanner
          cameraStyle={{width: '100%', height: '100%'}}
          cameraContainerStyle={{
            overflow: 'hidden',
            backgroundColor: 'transparent',
          }}
          cameraType="back"
          onRead={handleScan}
          reactivate={true}
          reactivateTimeout={5000}
        // flashMode={RNCamera.Constants.FlashMode.torch}
        />
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999,}
          }>
          <Text style={{color: '#fff',
            fontSize: 14,
            fontWeight: 'bold',
          }}>
            Please put the QR Code within the box
          </Text>
          <Image
            source={require('../../../images/qrscanner.png')}
            style={{width: 300, height: 300, tintColor: '#fff'}}
            resizeMode="contain"
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: '#A3D063',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              borderRadius: 10,
              marginBottom: 10,
              marginTop: 20,
              width: '50%'
            }}>
            <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 14}}>
              CANCEL
            </Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}
