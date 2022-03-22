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
const {width} = Dimensions.get('screen');
export default function AnnouncementItem({date, title, data}) {
  const [showModal, setShowModal] = useState(false);
  const [messageInformation, setMessageInformation] = useState(null)
  const [loading, setLoading] = useState(false)
  const handleModal = () => {
    setShowModal(true);
  };

  const getMessageInformation = async () => {
    setLoading(true)
    let response = await new Messages().getMessageInformation(data?.message_id)
    if(response.ok){
      setMessageInformation(response.data)
      setLoading(false)
    }else{
      alert('Something went wrong in fetching message Information')
      setLoading(false)
    }
  }

  useEffect(() => {
    getMessageInformation()
  }, [])
  

  return (
    <View
      style={{
        height: 50,
        width: width - 10,
        backgroundColor: '#fff',
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
      <TouchableWithoutFeedback onPress={() => handleModal()}>
        <View
          style={{
            height: 30,
            width: 50,
            backgroundColor: '#2E3192',
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            right: 10,
          }}>
          <Text style={{fontSize: 15, color: '#fff'}}>View</Text>
        </View>
      </TouchableWithoutFeedback>
      <Modals
        modalVisible={showModal}
        data = {messageInformation}
        onCloseModal={() => setShowModal(!showModal)}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
