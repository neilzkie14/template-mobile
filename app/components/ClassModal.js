import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  Linking,
  Image,
} from 'react-native';
import arrow from '../images/arrow.png'
import profile from '../images/profile.png'
import moment from 'moment';
import FeedExamination from '../components/ClassModalItem';
import { AccordionList } from 'accordion-collapse-react-native';
const { width } = Dimensions.get('screen');

export default function Modals({
  modalVisible,
  onRequestClose,
  data,
  onPress,
  feedData
}) {
  const test_type = type => {
    switch (type) {
      case 1:
        return 'Announcement';
      case 2:
        return 'Assignment';
      case 3:
        return 'Task';
      case 4:
        return 'Exam';
      case 5:
        return 'Interactive';
      default:
        break;
    }
  };

  const examHead = (item, index, isExpanded) => {
    return (
      <View
        style={{
          // alignItems: 'center',
          borderBottomWidth: 0.5,
          borderBottomColor: '#cccccc',
          padding: 10,
          justifyContent: 'space-between',
          backgroundColor: isExpanded ? '#fff' : '#2E3192'
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: isExpanded ? '#A3D063' : '#fff',
          }}>
          {'Exams'}
        </Text>
      </View>
    );
  };

  const examBody = item => {
    return (
      <View style={{ padding: 0 }}>
        <View>
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
      </View>
    );
  };

  const taskHead = (item, index, isExpanded) => {
    return (
      <View
        style={{
          // alignItems: 'center',
          borderBottomWidth: 0.5,
          borderBottomColor: '#cccccc',
          padding: 10,
          justifyContent: 'space-between',
          backgroundColor: isExpanded ? '#fff' : '#2E3192'
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: isExpanded ? '#A3D063' : '#fff',
          }}>
          {'Tasks'}
        </Text>
      </View>
    );
  };

  const taskBody = item => {
    return (
      <View style={{ padding: 0 }}>
        <View>
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
      </View>
    );
  };

  const assignmentHead = (item, index, isExpanded) => {
    return (
      <View
        style={{
          // alignItems: 'center',
          borderBottomWidth: 0.5,
          borderBottomColor: '#cccccc',
          padding: 10,
          justifyContent: 'space-between',
          backgroundColor: isExpanded ? '#fff' : '#2E3192'
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: isExpanded ? '#A3D063' : '#fff',
          }}>
          {'Assignments'}
        </Text>
      </View>
    );
  };

  const assignmentBody = item => {
    return (
      <View style={{ padding: 0 }}>
        <View>
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
      </View>
    );
  };

  const interactiveHead = (item, index, isExpanded) => {
    return (
      <View
        style={{
          // alignItems: 'center',
          borderBottomWidth: 0.5,
          borderBottomColor: '#cccccc',
          padding: 10,
          justifyContent: 'space-between',
          backgroundColor: isExpanded ? '#fff' : '#2E3192'
        }}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 20,
            color: isExpanded ? '#A3D063' : '#fff',
          }}>
          {'Interactives'}
        </Text>
      </View>
    );
  };

  const interactiveBody = item => {
    return (
      <View style={{ padding: 0 }}>
        <View>
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
      </View>
    );
  };

  console.log({ feedData })
  return (
    <View>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={onRequestClose}>
        <SafeAreaView style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <View
              style={{
                borderBottomWidth: 1,
                borderBottomColor: '#f0f0f0',
                padding: 10
              }}>
              <TouchableOpacity onPress={onPress} style={{ position: 'absolute', height: 50, justifyContent: 'center', padding: 5, zIndex: 99 }}>
                <Image
                  source={arrow}
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: '#A3D063',
                    transform: [{ rotate: '90deg' }],
                  }}
                  resizeMethod="resize"
                />
              </TouchableOpacity>
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: '#707070',
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}
                >
                  {data}
                </Text>
              </View>
            </View>
            <View style={{ paddingVertical: 20 }}>
              <ScrollView>
                <AccordionList
                  list={[
                    {
                      title: 'Exams',
                    },
                  ]}
                  header={examHead}
                  body={examBody}
                  expandedKey={0}
                />
                <AccordionList
                  list={[
                    {
                      title: 'Tasks',
                    },
                  ]}
                  header={taskHead}
                  body={taskBody}
                  expandedKey={1}
                />

                <AccordionList
                  list={[
                    {
                      title: 'Assignments',
                    },
                  ]}
                  header={assignmentHead}
                  body={assignmentBody}
                  expandedKey={1}
                />
                <AccordionList
                  list={[
                    {
                      title: 'Interactives',
                    },
                  ]}
                  header={interactiveHead}
                  body={interactiveBody}
                  expandedKey={1}
                />
              </ScrollView>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  );
}
