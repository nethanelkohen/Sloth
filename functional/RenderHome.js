import React from "react";
import { Text, Body, Button } from "native-base";

const RenderHome = ({ props }) => {
  if (props) {
    return (
      <Body>
        <Text>Username: {props.username}</Text>
        <Text>Home Station: {props.home_station}</Text>
      </Body>
    );
  } else return null;
};

export default RenderHome;
