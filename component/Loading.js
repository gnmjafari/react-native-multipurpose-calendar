import * as React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";

const Loading = ({ size = "large", color }) => (
  <ActivityIndicator
    style={styles.loading}
    size={size}
    animating={true}
    color={color}
  />
);

export default Loading;

const styles = StyleSheet.create({
  loading: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "50%",
  },
});
