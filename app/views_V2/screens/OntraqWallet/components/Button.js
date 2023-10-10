import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const Button = ({
  onPress,
  style,
  textStyle,
  buttonLabel = 'BUTTON',
  disabled = false,
}) => (
  <TouchableOpacity
    disabled={disabled}
    onPress={onPress}
    style={[styles.buttonStyle, style]}>
    <Text style={[styles.textStyle, disabled && styles.disabled, textStyle]}>
      {buttonLabel}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  buttonStyle: {
    height: 16,
    width: 62,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    alignSelf: 'center',
    borderRadius: 7
  },
  textStyle: {
    color: '#3D58BE',
    fontSize: 8,
  },
  disabled: {
    color: '#888',
  },
});

export default Button;
