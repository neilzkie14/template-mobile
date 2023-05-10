import React from 'react';
import {
  View,
  Text,
} from 'react-native';
export default function LiteUserText({}) {

  return (
    <View style={{flex: 1, justifyContent: 'center', marginBottom: 70}}>
        <Text style= {{textAlign: 'center'}}>This feature is available on full version.</Text>
    </View>
  );
}

