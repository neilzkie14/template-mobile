import React from 'react';
import {View, Text, ScrollView} from 'react-native'
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import Announcement from '../Announcement/Announcement';
import Lms from '../Lms/Lms';

export default function Home() {
  return (
    <View style = {{ flex: 1 }}>
        <Header />
        <ScrollView style={{marginBottom: 80}}>
          {/* <Announcement /> */}
          <Lms />
        </ScrollView>
        {/* <Footer /> */}
    </View>
  )
}
