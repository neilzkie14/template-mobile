import React, {useContext, useEffect, useState} from 'react';
import {Text, View, Image, ScrollView, RefreshControl} from 'react-native';
import OntraqWalletAPI from '../../../api/OntraqWallet';
import {StudentContext} from '../../../context/StudentContext';
import {currencyFormat} from '../../../utils/MoneyConverter';
import TransactionItem from './components/TransactionItem';
import qrIcon from '../../../images/qrcode-wallet.png';
import Button from './components/Button';
import Header from '../../../components/Header';
import Loader from '../../../components/Loader';
import LiteUserText from '../../../components/LiteUserText';
import { UserContext } from '../../../context/UserContext';
import { NavigationContext, useRoute } from '@react-navigation/native';
import { FloatingAction } from 'react-native-floating-action';

export default function OntraqWallet() {
  const studentContext = useContext(StudentContext);
  const {student} = studentContext.data;
  const [transaction, setTransaction] = useState(null);
  const [loader, setLoader] = useState(false);
  const userContext = useContext(UserContext);
  const {user} = userContext.data;
  const navigation = useContext(NavigationContext);
  const route = useRoute();
  let screenName = route.name;

  const actions = [
    {
      text: "Announcement",
      icon: require("../../../images/megaphone-green.png"),
      color: '#A3D063',
      name: "bt_announcement",
      position: 2,
    },
    {
      text: "LMS",
      icon: require("../../../images/book-green.png"),
      color: '#A3D063',
      name: "bt_lms",
      position: 1
    },
    {
      text: "Ontraq",
      icon: require("../../../images/steps-green.png"),
      color: '#A3D063',
      name: "bt_Ontraq",
      position: 3
    },
    // {
    //   text: "Wallet",
    //   icon: require("../../../images/wallet.png"),
    //   name: "bt_wallet",
    //   position: 4
    // },
    {
      text: "Settings",
      icon: require("../../../images/settings2.png"),
      color: '#A3D063',
      name: "bt_settings",
      position: 4
    }
  ];

  const getWallet = async () => {
    setLoader(true);
    let res = await new OntraqWalletAPI().getTransactions(student?.student_no);
    console.log(JSON.stringify(res));
    if (res.ok) {
      setTransaction(res.data);
    } else {
      alert('Something went wrong');
    }
    setLoader(false);
  };

  useEffect(() => {
    getWallet();
  }, [student]);

  return (
    <View style={{backgroundColor: '#FFF', flex: 1}}>
      <Header />
      {user?.access_type === 'lite' ? 
        <LiteUserText />
      :
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={loader} onRefresh={getWallet} />
          }>
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
              alignItems: 'center',
            }}>
            <View style={{flex: 1}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 16,
                }}>
                <View
                  style={{
                    height: 32,
                    width: 32,
                    backgroundColor: '#fff',
                    borderRadius: 16,
                  }}>
                  <Text
                    style={{
                      color: 'black',
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      height: 32,
                      fontWeight: 'bold',
                      fontSize: 20,
                    }}>
                    {student?.user?.first_name[0]}
                  </Text>
                </View>
                <View style={{justifyContent: 'center', marginLeft: 8}}>
                  <Text
                    style={{
                      color: '#FFFFFF',
                    }}>{`${student?.user?.first_name} ${student?.user?.last_name}`}</Text>
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
                <Text
                  style={{fontSize: 28, fontWeight: 'bold', color: '#FFFFFF'}}>
                  {!loader ? currencyFormat(parseFloat(transaction?.points)) : 'Loading...'}
                </Text>
              </View>
              <Text style={{color: '#FFFFFF', fontSize: 12}}>
                ID NUMBER : {student?.student_no}
              </Text>
            </View>
            <View>
              <Image
                source={qrIcon}
                style={{width: 76, height: 76, marginBottom: 20}}
                resizeMode="contain"
              />
              <Button
                onPress={() =>
                  alert('To Add Funds please visit School Cashier / Admin.')
                }
                buttonLabel="Add Funds"
              />
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
          <View style={{padding: 12, marginHorizontal: 32, paddingBottom: 50}}>
            {transaction?.wallet_transactions
              ?.sort(
                (a, b) =>
                  Date.parse(b.transaction_datetime) -
                  Date.parse(a.transaction_datetime),
              )
              .map((item, index) => {
                return <TransactionItem item={item} />;
              })}
          </View>
        </ScrollView>
      }
      <FloatingAction
          actions={screenName != 'Home' ? actions : actionWithoutHome}
          onPressItem={name => {
            console.log(`selected button: ${name}`)
            if(name === 'bt_announcement'){
              navigation.navigate('Home');
            }else if(name === 'bt_lms'){
              alert(`selected button: ${name}`);
            }else if(name === 'bt_ontraq'){
              navigation.navigate('Home');
            }else if(name === 'bt_wallet'){
              navigation.navigate('OntraqWallet');
            }else if(name === 'bt_settings'){
              alert(`selected button: ${name}`);
            }
          }}
          color='#A3D063'
          shadow={{
            shadowOpacity: 0.35, shadowOffset: { width: 0, height: 5 }, shadowColor: "#000000", shadowRadius: 3 
          }}
          textBackground={'#A3D063'}
          visible={true}
        />
      {loader && <Loader />}
    </View>
  );
}
