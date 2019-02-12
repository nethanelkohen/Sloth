import React from "react";
import { ListItem, Body, Right, Button, Text } from "native-base";
import store from "react-native-simple-store";
import checkStatus from "../utils/checkStatus";

const RenderStations = ({ props, handlePress }) => {
  if (!props) {
    return null;
  }

  return props.map(station => {
    let nycTime = new Date(station.updatedAt).toLocaleString("en-US", {
      timeZone: "America/New_York"
    });

    return (
      <ListItem avatar key={station.id}>
        <Body>
          <Button transparent onPress={() => handlePress(station.station)}>
            <Text style={checkStatus(station.status)}>{station.station}</Text>
          </Button>
          <Text style={{ fontSize: 16 }} note>
            last updated: {nycTime.toLocaleString()}
          </Text>
        </Body>
        <Right>
          <Text note style={checkStatus(station.status)}>
            {station.status}
          </Text>
        </Right>
      </ListItem>
    );
  });
};

export default RenderStations;
