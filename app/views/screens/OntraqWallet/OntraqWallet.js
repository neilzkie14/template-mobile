import React, {useContext, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import OntraqWalletAPI from '../../../api/OntraqWallet';
import {StudentContext} from '../../../context/StudentContext';
import TransactionItem from './components/TransactionItem';

export default function OntraqWallet() {
  const studentContext = useContext(StudentContext);
  const {student} = studentContext.data;
  const [transaction, setTransaction] = useState(null);

  const getWallet = async () => {
    let res = await new OntraqWalletAPI().getTransactions(student?.student_no);
    console.log(JSON.stringify(res));
    if (res.ok) {
      setTransaction(res.data);
    } else {
      alert('Something went wrong');
    }
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <View>
      <View
        style={{
          borderWidth: 1,
          borderColor: '#A3D063',
          margin: 12,
          borderRadius: 12,
          paddingVertical: 24,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 30, color: '#A3D063', marginRight: 8}}>
            ₱
          </Text>
          <Text style={{fontSize: 40, fontWeight: 'bold', color: '#707070'}}>
            {transaction?.points || 'Loading...'}
          </Text>
        </View>
        <Text style={{color: 'gray', textAlign: 'center', marginTop: 12}}>
          Total Available Points
        </Text>
      </View>
      <ScrollView>
        <View style={{padding: 12}}>
          <Text
            style={{
              color: '#707070',
              fontSize: 18,
              marginBottom: 16,
              fontWeight: 'bold',
            }}>
            Transactions
          </Text>
          {transaction?.wallet_transactions?.map((item, index) => {
            return <TransactionItem item={item} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
}
