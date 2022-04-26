import {NavigationContext} from '@react-navigation/native';
import {AccordionList} from 'accordion-collapse-react-native';
import React, {useEffect, useState, useContext} from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import LmsStudentAPI from '../../../api/Lms';
import Header from '../../../components/Header';
import Loader from '../../../components/Loader';
import {StudentContext} from '../../../context/StudentContext';
import FeedAnnouncement from './LMSFeedItems/FeedAnnouncement';
import FeedExamination from './LMSFeedItems/FeedExamination';

export default function Home() {
  const navigation = useContext(NavigationContext);
  const studentContext = useContext(StudentContext);
  const {student} = studentContext.data;
  const [feedData, setFeedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);

  const title = [
    {
      title: 'General Announcements',
    },
  ];

  const getFeedLMS = async () => {
    if (student == null) {
      alert('Select Student');
    } else {
      setLoading(true);
      let response = await new LmsStudentAPI().getNewsFeedLms(
        student?.user?.lms_id,
        student?.user?.lms_school_code,
      );
      console.log({response: response.data});
      if (response.ok) {
        // setFeedData(response.data);
        console.log({response});
        let data = response?.data?.map(item => item?.class);
        setFeedData(response?.data);
        let uniqueData = [];
        data.forEach(item => {
          let isUnique = true;
          uniqueData.forEach(uniqueItem => {
            if (uniqueItem?.id == item?.id) {
              isUnique = false;
            }
          });
          if (isUnique) {
            uniqueData.push(item);
          }
        });
        setClasses(uniqueData);
      } else {
        alert('Something went wrong in fetching News Feed');
      }
      setLoading(false);
    }
  };

  const _head = (item, index, isExpanded) => {
    return (
      <View
        style={{
          backgroundColor: isExpanded ? '#fff' : '#A3D063',
          marginTop: 10,
          padding: 10,
          borderRadius: 10,
          borderRadius: 5,
          borderWidth: 0.5,
          borderColor: '#cccccc',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: isExpanded ? '#A3D063' : '#fff',
          }}>
          {`Class: ${item}`}
        </Text>
      </View>
    );
  };

  const _body = item => {
    return (
      <View style={{padding: 10}}>
        <View>
        <Text style = {{ fontSize: 26, fontWeight: 'bold', color: '#d91f27', marginTop: 10, }}>Examination</Text>
          {feedData
            .filter(feed => feed.class != null)
            .map((item, key) => {
              if (item?.type == 4) {
                return (
                  <FeedExamination
                    key={key}
                    teacher={item?.updatedBy}
                    type={item?.type}
                    description={item?.title}
                    dateCreated={item?.dateUpdated}
                  />
                );
              }
            })}
        </View>
        <View>
          <Text style = {{ fontSize: 26, fontWeight: 'bold', color: '#d91f27', marginTop: 10, }}>Task</Text>
          {feedData
            .filter(feed => feed.class != null)
            .map((item, key) => {
              if (item?.type == 3) {
                return (
                  <FeedExamination
                    key={key}
                    teacher={item?.updatedBy}
                    type={item?.type}
                    description={item?.title}
                    dateCreated={item?.dateUpdated}
                  />
                );
              }
            })}
        </View>
        <View>
          <Text style = {{ fontSize: 26, fontWeight: 'bold', color: '#d91f27', marginTop: 10, }}>Assignment</Text>
          {feedData
            .filter(feed => feed.class != null)
            .map((item, key) => {
              if (item?.type == 2) {
                return (
                  <FeedExamination
                    key={key}
                    teacher={item?.updatedBy}
                    type={item?.type}
                    description={item?.title}
                    dateCreated={item?.dateUpdated}
                  />
                );
              }
            })}
        </View>
        <View>
          <Text style = {{ fontSize: 26, fontWeight: 'bold', color: '#d91f27', marginTop: 10, }}>Interactive</Text>
          {feedData
            .filter(feed => feed.class != null)
            .map((item, key) => {
              if (item?.type == 5) {
                return (
                  <FeedExamination
                    key={key}
                    teacher={item?.updatedBy}
                    type={item?.type}
                    description={item?.title}
                    dateCreated={item?.dateUpdated}
                  />
                );
              }
            })}
        </View>
      </View>
    );
  };

  const announcementHead = (item, index, isExpanded) => {
    return (
      <View
        style={{
          backgroundColor: isExpanded ? '#fff' : '#A3D063',
          marginTop: 10,
          padding: 10,
          borderRadius: 10,
          borderRadius: 5,
          borderWidth: 0.5,
          borderColor: '#cccccc',
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: isExpanded ? '#A3D063' : '#fff',
          }}>
          {'General Announcements'}
        </Text>
      </View>
    );
  };

  const announcementBody = item => {
    return (
      <View style={{padding: 10}}>
        <View>
          {feedData
            .filter(feed => feed.class == null)
            .map((item, key) => {
              return (
                <FeedAnnouncement
                  key={key}
                  teacher={item?.updatedBy}
                  type={item?.type}
                  description={item?.description}
                  examCode={item?.referenceId}
                  dateCreated={item?.dateUpdated}
                />
              );
            })}
        </View>
      </View>
    );
  };

  useEffect(() => {
    getFeedLMS();
  }, []);

  return (
    <View style={{flex: 1, marginBottom: 60}}>
      <Header />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => getFeedLMS()} />
        }>
        <View style={{flex: 1, padding: 20}}>
          <ScrollView>
            <View>
              <AccordionList
                list={title}
                header={announcementHead}
                body={announcementBody}
                expandedKey={0}
              />
              <AccordionList
                list={classes}
                header={_head}
                body={_body}
                expandedKey={0}
              />
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      {loading && <Loader />}
    </View>
  );
}
