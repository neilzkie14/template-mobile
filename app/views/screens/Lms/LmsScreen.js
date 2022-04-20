import {NavigationContext} from '@react-navigation/native';
import React, {useEffect, useState, useContext} from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import LmsStudentAPI from '../../../api/Lms';
import Header from '../../../components/Header';
import Loader from '../../../components/Loader';
import {StudentContext} from '../../../context/StudentContext';
import FeedAnnouncement from './LMSFeedItems/FeedAnnouncement';
import FeedExamination from './LMSFeedItems/FeedExamination';
// import Lms from '../Lms/Lms';

export default function Home() {
  const navigation = useContext(NavigationContext);
  const studentContext = useContext(StudentContext);
  const {student} = studentContext.data;
  const [feedData, setFeedData] = useState([]);
  const [loading, setLoading] = useState(false);

  console.log({student});

  const getFeedLMS = async () => {
    setLoading(true);
    let response = await new LmsStudentAPI().getNewsFeedLms(16624);
    if (response.ok) {
      setFeedData(response.data);
    } else {
      alert('Something went wrong in fetching News Feed');
    }
    setLoading(false);
  };

  useEffect(() => {
    getFeedLMS();
  }, []);

  return (
    <View style={{flex: 1, marginBottom: 60}}>
      <Header />
      <ScrollView refreshControl={
                <RefreshControl
                  refreshing={loading}
                  onRefresh={() => getFeedLMS()}
                />
              }>
        <View style={{flex: 1, padding: 20}}>
          {feedData.length > 0 ? (
            <View>
              {feedData.map((item, key) => {
                console.log({item: item});
                if (item?.type == 4) {
                  return (
                    <FeedAnnouncement
                      key={key}
                      teacher={item?.updatedBy}
                      type={item?.type}
                      description={item?.title}
                    />
                  );
                }
                if (item?.type == 3) {
                  return (
                    <FeedExamination
                      key={key}
                      teacher={item?.updatedBy}
                      type={item?.type}
                      description={item?.title}
                      examCode = {item?.referenceId}
                    />
                  );
                }
                if (item?.type == 2) {
                  return (
                    <FeedExamination
                      key={key}
                      teacher={item?.updatedBy}
                      type={item?.type}
                      description={item?.title}
                      examCode = {item?.referenceId}
                    />
                  );
                }
                if (item?.type == 1) {
                  return (
                    <FeedExamination
                      key={key}
                      teacher={item?.updatedBy}
                      type={item?.type}
                      description={item?.title}
                      examCode = {item?.referenceId}
                    />
                  );
                }
                if (item?.type == 5) {
                  return (
                    <FeedExamination
                      key={key}
                      teacher={item?.updatedBy}
                      type={item?.type}
                      description={item?.title}
                      examCode = {item?.referenceId}
                    />
                  );
                }
              })}
            </View>
          ) : (
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Text>No Feeds</Text>
            </View>
          )}
        </View>
      </ScrollView>
      {loading && <Loader />}
    </View>
  );
}
