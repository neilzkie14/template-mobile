import React from "react";
import { ActivityIndicator, StyleSheet, Dimensions, View } from "react-native";

const {width, height} = Dimensions.get('screen');

const Loader = () => (
  <View style={styles.container}>
    <ActivityIndicator size="large" color="#A3D063" />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: width,
    height: height,
    backgroundColor: 'transparent',
    position: 'absolute',
  }
});

export default Loader;