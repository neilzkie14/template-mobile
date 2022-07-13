import {NavigationContext} from '@react-navigation/native';
import {AccordionList} from 'accordion-collapse-react-native';
import React, {useEffect, useState, useContext} from 'react';
import {View, Text, ScrollView, RefreshControl} from 'react-native';
import LmsStudentAPI from '../../../api/Lms';
import Header from '../../../components/Header';
import Loader from '../../../components/Loader';
import {StudentContext} from '../../../context/StudentContext';
import LmsItems from './components/LmsItem';
import ClassItem from './components/ClassItem';
import FeedAnnouncement from './LMSFeedItems/FeedAnnouncement';
import FeedExamination from './LMSFeedItems/FeedExamination';
import Modals from '../../../components/ClassModal';

export default function Home() {
  const navigation = useContext(NavigationContext);
  const studentContext = useContext(StudentContext);
  const {student} = studentContext.data;
  const [feedData, setFeedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState([]);
  const [lmsID, setLmsID] = useState('');
  const [schoolID, setSchoolID] = useState('');
  const [showModal, setShowModal] = useState(false);

  const title = [
    {
      title: 'General Announcements',
    },
  ];

  const getFeedLMS = async (lmsID,schoolID) => {
    if (student == null) {
      alert('Select Student');
    } else {
      setLoading(true);
      let response = await new LmsStudentAPI().getNewsFeedLms(
        student?.user?.lms_id ? student?.user?.lms_id : lmsID,
        student?.user?.lms_school_code ?  student?.user?.lms_school_code : schoolID
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
        response.status == 404 ? alert('Student is not registered to LMS') : alert('Something went wrong in fetching News Feed')
        setClasses([]);
        setFeedData([]);
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
          {`Class`}
        </Text>
      </View>
    );
  };

  const _body = item => {
    console.log({feedData})
    return (
      <View style={{}}>
        <View>
          {/* {feedData
            .filter(feed => feed.class != null)
            .map((item, key) => {
              if (item?.type == 4) {
                return (
                  // <FeedExamination
                  //   key={key}
                  //   teacher={item?.updatedBy}
                  //   type={item?.type}
                  //   description={item?.title}
                  //   dateCreated={item?.dateUpdated}
                  // />
                  <ClassItem key={key} item={item} />

                );
              }
            })} */}
            {classes.map((item, key) => {
              return (
                <ClassItem key={key} item={item} showModal={showModal} setShowModal={setShowModal} />
              );
            })}
        </View>
        {/* <View>
          <Text style = {{ fontSize: 26, fontWeight: 'bold', color: '#2e3192', marginTop: 10, }}>Task</Text>
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
          <Text style = {{ fontSize: 26, fontWeight: 'bold', color: '#2e3192', marginTop: 10, }}>Assignment</Text>
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
          <Text style = {{ fontSize: 26, fontWeight: 'bold', color: '#2e3192', marginTop: 10, }}>Interactive</Text>
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
        </View> */}
      </View>
    );
  };

  const announcementHead = (item, index, isExpanded) => {
    return (
      <View
        style={{
          backgroundColor: isExpanded ? '#fff' : '#A3D063',
          // marginTop: 10,
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
      <View style={{padding: 0}}>
        <View>
          {feedData
            .filter(feed => feed.class == null)
            .map((item, key) => {
              return (
                <LmsItems key={key} item={item} />
                // <FeedAnnouncement
                //   key={key}
                //   teacher={item?.updatedBy}
                //   type={item?.type}
                //   description={item?.description}
                //   examCode={item?.referenceId}
                //   dateCreated={item?.dateUpdated}
                // />
              );
            })}
        </View>
      </View>
    );
  };

  useEffect(() => {
    getFeedLMS();
  }, []);

  useEffect(() => {
    getFeedLMS(lmsID,schoolID);
  }, [student]);

  return (
    <View style={{flex: 1, marginBottom: 60}}>
      <Header setlmsID={()=>setLmsID()} setSchoolID={()=>setSchoolID()} lmsID={lmsID} schoolID={schoolID} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={() => getFeedLMS()} />
        }>
        <View style={{flex: 1, paddingVertical: 5}}>
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
                expandedKey={1}
              />
            </View>
          </ScrollView>
        </View>
      </ScrollView>
      <Modals
        feedData={feedData}
        modalVisible={showModal}
        data={classes}
        onPress={() => setShowModal(!showModal)}
        setShowModal={setShowModal}
        showModal={showModal}
      />
      {loading && <Loader />}
    </View>
  );
}
