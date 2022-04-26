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
import { TouchableOpacity } from 'react-native-gesture-handler';
const {width} = Dimensions.get('screen');
export default function AnnouncementItem({date, title, data, getMessages = () => {}}) {
  console.log({data})
  const [showModal, setShowModal] = useState(false);
  const [messageInformation, setMessageInformation] = useState(null)
  const [loading, setLoading] = useState(false)
  const handleModal = async() => {
    let response = await new Messages().read(data.id)
    if(response.ok){
      getMessages()

    }else{
      alert('Something went wrong in fetching Message Information')
    }
    

    setShowModal(true);
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => handleModal()}
      style={{
        height: 50,
        width: width - 10,
        backgroundColor: data.read_status == "unread" ? '#2E319222' : "#fff",
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
      }}>
      <View>
        <Text style={{fontSize: 14, color: '#BCBCBC', paddingLeft: 10}}>
          {moment(date).startOf().fromNow()}
        </Text>
      </View>
      <View>
        <Text
          style={{
            fontSize: 15,
            color: '#707070',
            paddingLeft: 20,
            fontWeight: 'bold',
            width: width / 2,
          }}
          numberOfLines={1}>
          {title}
        </Text>
      </View>
     
      <Modals
        modalVisible={showModal}
        data = {data}
        onCloseModal={() => setShowModal(!showModal)}
        setShowModal = {setShowModal}
        showModal = {showModal}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
