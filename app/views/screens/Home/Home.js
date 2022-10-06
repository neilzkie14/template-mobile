import React, {useState, useEffect, useContext} from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import Messages from '../../../api/Messages';
import Header from '../../../components/Header';
import Loader from '../../../components/Loader';
import StudentModalSelection from '../../../components/StudentModalSelection';
import AnnouncementItem from '../Announcement/components/AnnouncementItem';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

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
    <View style={{flex: 1, marginBottom: 60}}>
      <Header/>
      <ScrollView
        contentContainerStyle={{flex: 1, justifyContent: 'center', alignContent: 'center'}}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => getMessages()}
          />
        }>
        <View>
          {messages.length <= 0 ? (
            <View style = {{ justifyContent: 'center', padding: 20, alignItems: 'center' }}>
              <Text style={{fontWeight: 'bold', color: '#aaa', fontSize: 20,}}>There is no announcements as of now</Text>
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
                    data = {item}
                  />
                );
              })}
            </View>
          )}
        </View>
      </ScrollView>
      {loading && <Loader />}
    </View>
  );
}
