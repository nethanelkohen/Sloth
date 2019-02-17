import React from "react";
import { View } from "react-native";
import { ListItem, Body, Right, Button, Text } from "native-base";
import checkStatus from "../utils/checkStatus";

const RenderStations = ({ stations, handlePress, homeStation }) => {
  if (!stations) {
    return null;
  }

  return stations.map(station => {
    let nycTime = new Date(station.updatedAt).toLocaleString("en-US", {
      timeZone: "America/New_York"
    });

    return (
      <ListItem avatar key={station.id}>
        <Body>
          <Button transparent onPress={() => handlePress(station.station)}>
            {homeStation === station.station ? (
              <View
                style={{
                  borderRadius: 10,
                  borderWidth: 3,
                  borderColor: "red"
                }}
              >
                <Text style={checkStatus(station.status)}>
                  home: {station.station}
                </Text>
              </View>
            ) : (
              <Text style={checkStatus(station.status)}>{station.station}</Text>
            )}
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
