import React from 'react';
import {Text, View} from 'react-native';

export default function TransactionItem({item}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#8c8c8c',
        borderBottomWidth: 1,
        paddingBottom: 12,
        marginBottom: 12,
        alignItems: 'center',
      }}>
      <View style={{flex: 1}}>
        <Text style={{color: '#707070'}}>
          {item.transaction_type == 'credit'
            ? 'Send money to'
            : 'Received money from'}
        </Text>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginTop: 4,
            color: '#666',
          }}>
          {item.description || 'Not Available'}
        </Text>
      </View>
      <View>
        <Text style={{textAlign: 'right', color: '#707070'}}>
          {new Date(item.transaction_datetime).toLocaleDateString()}
        </Text>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: item.transaction_type == 'credit' ? '#FF0000' : '#A3D063',
          }}>
          ₱ {item.amount}
        </Text>
      </View>
    </View>
  );
}
