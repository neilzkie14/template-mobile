import React, {useContext, useEffect, useState} from 'react';
import {Text, View, Image, ScrollView} from 'react-native';
import OntraqWalletAPI from '../../../api/OntraqWallet';
import {StudentContext} from '../../../context/StudentContext';
import { currencyFormat } from '../../../utils/MoneyConverter';
import TransactionItem from './components/TransactionItem';
import qrIcon from '../../../images/qrcode-wallet.png'
import Button from './components/Button';
import Header from '../../../components/Header';

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
  }, [student]);

  return (
    <View style={{backgroundColor: '#FFF', flex: 1}}>
      <Header />
      <View
        style={{
          borderWidth: 1,
          backgroundColor: '#3D58BE',
          margin: 12,
          borderRadius: 12,
          paddingVertical: 12,
          paddingHorizontal: 24,
          marginHorizontal: 32,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 16}}>
            <View style={{height: 32, width: 32, backgroundColor: '#fff', borderRadius: 16}}>
              <Text style={{color: 'black', textAlign: 'center', textAlignVertical: 'center', height: 32, fontWeight: 'bold', fontSize: 20}}>{student?.user?.first_name[0]}</Text>
            </View>
            <View style={{justifyContent: 'center', marginLeft: 8}}>
              <Text style={{color: '#FFFFFF'}}>{`${student?.user?.first_name} ${student?.user?.last_name}`}</Text>
              {/* <Text style={{color: '#FFFFFF'}}>SCHOOL OF TOMMORROW</Text> */}
            </View>
          </View>
          <Text style={{color: '#FFFFFF', marginTop: 12, fontSize: 12}}>
            Available Balance
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              // justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 16,
            }}>
            <Text style={{fontSize: 28, color: '#FFFFFF', marginRight: 8}}>
              ₱
            </Text>
            <Text style={{fontSize: 28, fontWeight: 'bold', color: '#FFFFFF'}}>
              {currencyFormat(parseFloat(transaction?.points)) || 'Loading...'}
            </Text>
          </View>
          <Text style={{color: '#FFFFFF', fontSize: 12}}>ID NUMBER : {student?.student_no}</Text>
        </View>
        <View>
          <Image source={qrIcon} style={{width: 76, height: 76, marginBottom: 20}} resizeMode='contain' />
          <Button onPress={() => alert('To Add Funds please visit School Cashier / Admin.')} buttonLabel='Add Funds' />
        </View>
      </View>
      <Text
        style={{
          color: '#17254A',
          fontSize: 24,
          marginBottom: 16,
          marginHorizontal: 32,
          fontWeight: 'bold',
        }}>
        Transaction History
      </Text>
      <ScrollView>
        <View style={{padding: 12, marginHorizontal: 32, paddingBottom: 50}}>
          {transaction?.wallet_transactions?.sort((a, b) => Date.parse(b.transaction_datetime) - Date.parse(a.transaction_datetime)).map((item, index) => {
            return <TransactionItem item={item} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
}
