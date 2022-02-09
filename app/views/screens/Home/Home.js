import React from 'react';
import {View, Text, ScrollView} from 'react-native'
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';
import Announcement from '../Announcement/Announcement';

export default function Home() {
  return (
    <View style = {{ flex: 1, backgroundColor: '#F0F0F0'}}>
        <Header />
        <ScrollView style={{marginBottom: 80}}>
          <Announcement />
        </ScrollView>
        <Footer />
    </View>
  )
}
