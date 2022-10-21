import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {currencyFormat} from '../../../../utils/MoneyConverter';

export default function TransactionItem({item}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#F5F5F5',
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingBottom: 12,
        marginBottom: 12,
        alignItems: 'center',
      }}>
      <View style={{flex: 1}}>
        <Text style={{color: '#B7B7B7'}}>
          {item.transaction_type == 'debit'
            ? 'Send money to'
            : 'Received money from'}
        </Text>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            marginTop: 4,
            color: '#707070',
          }}>
          {item.description || 'Not Available'}
        </Text>
      </View>
      <View>
        <Text style={{textAlign: 'right', color: '#B7B7B7'}}>
          {new Date(item.transaction_datetime).toLocaleDateString()}
        </Text>
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: item.transaction_type == 'debit' ? '#FF0000' : '#A3D063',
          }}>
          ₱ {currencyFormat(parseFloat(item.amount))}
        </Text>
      </View>
    </View>
  );
}
