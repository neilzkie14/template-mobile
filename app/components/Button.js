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
    height: 50,
    width: width - 80,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2E3192',
    alignSelf: 'center',
    borderRadius: 20
  },
  textStyle: {
    color: '#fff',
    fontSize: 20,
  },
  disabled: {
    color: '#888',
  },
});

export default Button;
