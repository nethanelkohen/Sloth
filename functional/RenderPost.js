import React from "react";
import { Body, Text } from "native-base";
import styles from "../styles/styles";

export default ({ props }) => {
  if (!props) {
    return null;
  }

  return (
    <Body>
      <Text style={[styles.mediumSize, styles.card]}>
        Update: {props.direction} bound {props.status_update} at {props.station}
      </Text>
    </Body>
  );
};
