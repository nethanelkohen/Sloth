import React from "react";
import { Body, Text } from "native-base";

export default ({ props }) => {
  if (!props) {
    return null;
  }

  return (
    <Body>
      <Text style={{ marginTop: 100, fontSize: 30 }}>
        Station updated: {props.station}
      </Text>
      <Text style={{ fontSize: 30 }}>New status: {props.status_update}</Text>
      <Text style={{ fontSize: 30 }}>Train: {props.train}</Text>
    </Body>
  );
};
