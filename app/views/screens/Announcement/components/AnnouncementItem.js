import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import moment from 'moment';
import Modals from '../../../../components/Modals';
import Messages from '../../../../api/Messages';
import {TouchableOpacity} from 'react-native-gesture-handler';
const {width} = Dimensions.get('screen');
export default function AnnouncementItem({
  date,
  title,
  data,
  getMessages = () => {},
}) {
  console.log({data});
  const [showModal, setShowModal] = useState(false);
  const [messageInformation, setMessageInformation] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleModal = async () => {
    let response = await new Messages().read(data.id);
    if (response.ok) {
      getMessages();
    } else {
      alert('Something went wrong in fetching Message Information');
    }

    setShowModal(true);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => handleModal()}
      style={{
        backgroundColor: data.read_status == 'unread' ? '#2E319222' : '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
        borderWidth: 1,
        borderColor: '#EBE4E4',
        marginHorizontal: 32,
        marginVertical: 12,
        borderRadius: 15,
      }}>
      <View style={{flexDirection: 'row', backgroundColor: '#F86767', borderRadius: 15}}>
        <View
          style={{
            alignItems: 'center',
            paddingRight: 20,
            marginLeft: 20,
            borderRightWidth: StyleSheet.hairlineWidth,
            width: 80,
            paddingVertical: 8,
            borderColor: '#EBE4E4',
          }}>
          <Text style={{fontSize: 24, color: '#fff', fontWeight: 'bold'}}>
            {moment(date).format('MMM')}
          </Text>
          <Text style={{fontSize: 24, color: '#fff', fontWeight: 'bold'}}>
            {moment(date).format('DD')}
          </Text>
          <Text style={{fontSize: 12, color: '#fff'}}>
            {moment(date).format('h:mm A')}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 15,
            color: '#17254A',
            fontWeight: 'bold',
            width: 200,
            paddingVertical: 8,
            backgroundColor: data.read_status == 'unread' ? 'gray' : '#fff',
            paddingLeft: 20,
            flex: 1,
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
          }}
          numberOfLines={5}>
          {title}
        </Text>
      </View>

      <Modals
        modalVisible={showModal}
        data={data}
        onCloseModal={() => setShowModal(!showModal)}
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
