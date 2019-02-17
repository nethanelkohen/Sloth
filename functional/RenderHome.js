import React from "react";
import { Text, Body, Button } from "native-base";

export default ({ props }) => {
  if (props) {
    return (
      <Body>
        <Text>Username: {props.username}</Text>
        <Text>Home Station: {props.home_station}</Text>
      </Body>
    );
  } else return null;
};
