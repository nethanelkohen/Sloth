import React from "react";
import { ListItem, Body, Right, Button, Text } from "native-base";
import { StyleSheet } from "react-native";
import checkStatus from "../utils/checkStatus";

export default ({ stations, handlePress, homeStation }) => {
  if (!stations) {
    return null;
  }

  return stations.map(station => {
    let nycTime = new Date(station.updatedAt).toLocaleString("en-US", {
      timeZone: "America/New_York"
    });

    return (
      <ListItem
        avatar
        key={station.id}
        style={homeStation === station.station ? styles.redBorder : null}
      >
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

const styles = StyleSheet.create({
  redBorder: {
    borderRadius: 10,
    borderWidth: 10,
    borderColor: "red"
  }
});
