import React from 'react';
import {View, Text, ScrollView} from 'react-native'
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import Announcement from '../Announcement/Announcement';
import Lms from '../Lms/Lms';
import Ontraq from '../Ontraq/Ontraq';

export default function Home() {
  return (
    <View style = {{ flex: 1, backgroundColor: '#F0F0F0'}}>
        <Header />
        <ScrollView style={{marginBottom: 80}}>
          {/* <Announcement /> */}
          {/* <Lms /> */}
          <Ontraq />
        </ScrollView>
        <Footer />
    </View>
  )
}
