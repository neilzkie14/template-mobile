import React, {useState, useContext} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  TouchableWithoutFeedback,
  Modal
} from 'react-native';
import {UserContext} from '../../../../context/UserContext';
import AnnouncementModal from '../../../../components/Modal';

const {width, height} = Dimensions.get('screen');
export default function AnnouncementItem({
  date,
  title,
  onPress,
  message
}) {
  const userContext = useContext(UserContext);
  const {user} = userContext.data;
  const [showModal, setShowModal] = useState(false)

  const handleModal = () => {
    setShowModal(true);
  }

  return (
    <View style={{height: 50, width: width-10, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', marginBottom: 5}}>
      <View>
        <Text style={{fontSize:14, color: '#BCBCBC', paddingLeft: 10}}>{date}</Text>
      </View>
      <View>
        <Text style={{fontSize:15, color: '#707070', paddingLeft: 20, fontWeight: 'bold'}}>{title}</Text>
      </View>
      <TouchableWithoutFeedback onPress={() => handleModal()}>
        <View style={{height: 30, width: 50, backgroundColor: '#2E3192', borderRadius: 5, justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 10}}>
          <Text style={{fontSize:15, color: '#fff'}}>View</Text>
        </View>
      </TouchableWithoutFeedback>
      <Modal
            transparent={true}
            animationType="slide"
            visible={showModal}
            onBackdropPress={() => setShowModal(false)}
            onRequestClose={() => setShowModal(false)}>
            <View
              style={{
                width,
                height: height,
                backgroundColor: '#e0e0e0ae',
              }}>
              <AnnouncementModal
                closeModal={() => setShowModal(false)}
                title={title}
                message={message}
                date={date}
              />
            </View>
        </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
});