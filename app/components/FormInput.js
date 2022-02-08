import React, {useState, useContext} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import eye_img from '../images/eye.png';
import eye_closed_img from '../images/eye-hide.png';
import {UserContext} from '../context/UserContext';

const {width} = Dimensions.get('screen');
export default function FormInput({
  data,
  item,
  setFields,
  index,
  isPassword,
  editable,
  setShowModal,
  setModalIcon,
  setModalMessage,
  setModalTitle,
}) {
  const [hidePassword, setHidePassword] = useState(data?.isPassword);
  const userContext = useContext(UserContext);
  const {user} = userContext.data;
  const [onFocus, setOnFocus] = useState(false)

  return (
    <View style={{alignSelf: 'center'}}>
        <Text style={styles.textInputLabel}>{`${data?.label}`}</Text>
      <View style={[styles.textInputWrap, {display: 'flex'}]}>
        <TextInput
          defaultValue={data?.value}
          value={data?.value}
          autoCorrect={false}
          autoCapitalize={data?.isPassword ? 'none' : 'sentences'}
          placeholder={data?.placeholder}
          placeholderTextColor="#BCBCBC"
          underlineColorAndroid="transparent"
        //   onChangeText={onChangeText}
          maxLength={data?.maxLength}
          keyboardType={data?.type}
          style={[styles.textInput, data?.isPassword && styles.passTextInput], {borderRadius: 10, borderWidth: 1, borderColor: onFocus ? '#A3D063' : '#E9E9E9'}}
          secureTextEntry={hidePassword}
        //   editable={item.editable}
          onFocus={() => setOnFocus(true)}
          onBlur={() => setOnFocus(false)}
        />
        {data?.isPassword && (
          <TouchableOpacity
            onPress={() => setHidePassword(prev => !prev)}
            style={styles.iconWrap}>
            <Image
              source={!hidePassword ? eye_img : eye_closed_img}
              resizeMode="contain"
              style={!hidePassword ? styles.hidePassIcon : styles.iconStyle}
            />
          </TouchableOpacity>
        )}
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {(data?.placeholder == 'New Password' ||
          data?.placeholder == 'Confirm New Password') && (
          <TouchableOpacity
            style={{paddingVertical: 2, marginRight: 2}}
            onPress={() => handlePasswordModal()}>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    width,
    height: 60,
    justifyContent: 'center',
  },
  body: {
    flexGrow: 1,
    width,
    alignItems: 'center',
  },
  textFieldsSection: {
    marginBottom: 30,
  },
  textFieldSectionLabel: {
    fontSize: 15,
    color: '#fe9a2e',
  },
  textInput: {
    width: width - 60,
    height: 40,
    padding: 0,
    marginLeft: 10,
    borderWidth: 0,
    color: '#000',
    fontSize: 15,
    textAlignVertical: 'center',
  },
  terms: {
    width: width - 130,
    fontSize: 10,
    marginTop: 10,
  },
  termsHighlight: {
    color: '#3d64a5',
  },
  alreadyHaveAnAccount: {
    marginTop: 20,
    marginBottom: 50,
  },
  alreadyHaveAnAccountText: {
    fontSize: 11,
    color: '#3d64a5',
  },
  textInputWrap: {
    width: width - 30,
    height: 40,
    justifyContent: 'flex-end',
    borderWidth: 1,
    borderColor: '#E9E9E9',
    marginVertical: 5,
    borderRadius: 10
  },
  passTextInput: {
    width: width - 95,
  },
  iconWrap: {
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
    position: 'absolute',
    right: 0,
  },
  iconStyle: {
    height: 31,
    width: 31,
    marginHorizontal: 15,
  },
  hidePassIcon: {
    height: 25,
    width: 25,
    marginHorizontal: 15,
  },
  errorLine: {
    color: 'red',
    fontSize: 8,
    marginTop: 0,
    width: width - 60,
  },
  backBtnImg: {
    height: 25,
    width: 25,
  },
  touchableArea: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputLabel: {
    color: '#707070',
    fontSize: 20,
    marginLeft: 5
  },

  colorSelectionBtn: {
    height: 40,
    width: width - 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
  },
  contentWrap: {
    width,
    alignItems: 'center',
  },
  colorName: {
    fontSize: 13,
    textTransform: 'capitalize',
  },
  color: {
    height: width / 15,
    width: width / 15,
    backgroundColor: 'red',
    borderWidth: 1,
    marginRight: 20,
  },
  informationIcon: {
    height: 15,
    width: 15,
    paddingHorizontal: 10,
  },
});
