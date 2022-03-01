import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableWithoutFeedback
} from 'react-native';

export default function ChildName({
    name
}) {

  return (
    <TouchableWithoutFeedback onPress={() => alert('Under Development')}>
        <Text style={{ marginHorizontal: 2,color: '#A3D063', textAlign: 'center', borderBottomWidth: 1, fontSize: 15, padding: 5, borderBottomColor: '#F0F0F0'}}>{name}</Text>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
});