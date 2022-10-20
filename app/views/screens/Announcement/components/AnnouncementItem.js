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
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#EBE4E4', 
        marginHorizontal: 32,
        marginVertical: 12,
        borderRadius: 15,
      }}>
      <View style={{flexDirection: 'row'}}>
        <View style={{alignItems: 'center', paddingRight: 20, marginHorizontal: 20, borderRightWidth: StyleSheet.hairlineWidth, width: 80, paddingVertical: 8, borderColor: '#EBE4E4'}}>
          <Text style={{fontSize: 24, color: '#17254A', fontWeight: 'bold'}}>
            {moment(date).format('MMM')}
          </Text>
          <Text style={{fontSize: 24, color: '#17254A', fontWeight: 'bold'}}>
            {moment(date).format('DD')}
          </Text>
          <Text style={{fontSize: 12, color: '#17254A'}}>
            {moment(date).format('h:mm a')}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 15,
            color: '#17254A',
            fontWeight: 'bold',
            width: 200,
            paddingVertical: 8,
          }}
          numberOfLines={1}>
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
