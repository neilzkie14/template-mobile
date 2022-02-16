import React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

export default function ChildName({
    name
}) {

  return (
    <View>
        <Text style={{ marginHorizontal: 2,color: '#A3D063', textAlign: 'center', borderBottomWidth: 1, fontSize: 15, padding: 5, borderBottomColor: '#F0F0F0'}}>Angel Parayno</Text>
    </View>
  );
}

const styles = StyleSheet.create({
});