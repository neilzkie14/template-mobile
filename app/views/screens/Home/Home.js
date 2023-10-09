import React, {useState, useEffect, useContext} from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import Messages from '../../../api/Messages';
import Header from '../../../components/Header';
import Loader from '../../../components/Loader';
import StudentModalSelection from '../../../components/StudentModalSelection';
import AnnouncementItem from '../Announcement/components/AnnouncementItem';
import { FloatingAction } from "react-native-floating-action";
import { NavigationContext } from '@react-navigation/native';



export default function Home() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useContext(NavigationContext);

  const actions = [
    {
      text: "Announcement",
      icon: require("../../../images/megaphone-green.png"),
      name: "bt_announcement",
      position: 2,
    },
    {
      text: "LMS",
      icon: require("../../../images/book-green.png"),
      name: "bt_lms",
      position: 1
    },
    {
      text: "Ontraq",
      icon: require("../../../images/steps-green.png"),
      name: "bt_Ontraq",
      position: 3
    },
    {
      text: "Wallet",
      icon: require("../../../images/wallet.png"),
      name: "bt_wallet",
      position: 4
    },
    {
      text: "Settings",
      icon: require("../../../images/settings2.png"),
      name: "bt_settings",
      position: 4
    }
  ];

  const getMessages = async () => {
    setLoading(true);
    let response = await new Messages().getMessages();
    if (response.ok) {
      setMessages(response.data);
      setLoading(false);
    } else {
      alert('Something went wrong in fetching Messages');
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <Header />
      <Text style={{color: '#17254A', fontWeight: 'bold', fontSize: 20, marginHorizontal: 32}}>Announcement</Text>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignContent: 'center',
        }}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => getMessages()}
          />
        }>
        <View>
          {messages.length <= 0 ? (
            <View
              style={{
                justifyContent: 'center',
                padding: 20,
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: 'bold', color: '#aaa', fontSize: 20}}>
                There is no announcements as of now
              </Text>
            </View>
          ) : (
            <View style={{padding: 5, flex: 1}}>
              {messages?.map((item, key) => {
                return (
                  <AnnouncementItem
                    getMessages={getMessages}
                    key={key}
                    date={item?.message?.updated_at}
                    title={item?.message?.content}
                    data={item}
                  />
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>

      <FloatingAction
          actions={actions}
          onPressItem={name => {
            console.log(`selected button: ${name}`)
            if(name === 'bt_announcement'){
            alert(`selected button: ${name}`);
            }else if(name === 'bt_lms'){
              alert(`selected button: ${name}`);
            }else if(name === 'bt_ontraq'){
              alert(`selected button: ${name}`);
            }else if(name === 'bt_wallet'){
              alert(name);
            }else if(name === 'bt_settings'){
              navigation.navigate('Settings');
            }
          }}
          color='#A3D063'
          shadow={{
            shadowOpacity: 0.35, shadowOffset: { width: 0, height: 5 }, shadowColor: "#000000", shadowRadius: 3 
          }}
          textBackground={'#A3D063'}
          visible={true}
        />
        

      {loading && <Loader />}
    </View>
  );
}
