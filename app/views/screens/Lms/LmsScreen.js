import React from 'react';
import {View, Text, ScrollView} from 'react-native'
import Header from '../../../components/Header';
import Lms from '../Lms/Lms';

export default function Home() {
  return (
    <View style = {{ flex: 1 , marginBottom: 60 }}>
        <Header />
        <ScrollView>
          <Lms />
        </ScrollView>
    </View>
  )
}
