import React from "react";
import { List, ListItem, Body, Right, Button, Text } from "native-base";
import styles from "../styles/styles";
import checkStatus from "../utils/checkStatus";

export default ({ stations, handlePress, homeStation, loading }) => {
  if (loading) {
    return (
      <Body>
        <Text style={[styles.loading, styles.size]}>LOADING...</Text>
      </Body>
    );
  }

  if (stations === "Network request failed" || stations.length == 0) {
    return <Text>Unable to connect to API</Text>;
  }

  if (stations.length > 0) {
    return stations.map(station => {
      let nycTime = new Date(station.updatedAt).toLocaleString("en-US", {
        timeZone: "America/New_York"
      });

      checkHome = () => {
        if (homeStation && homeStation === station.station) {
          return styles.redBorder;
        } else return null;
      };

      return (
        <List key={station.id} style={checkHome()}>
          <ListItem avatar>
            <Body>
              <Button transparent onPress={() => handlePress(station.station)}>
                <Text style={checkStatus(station.status)}>
                  {station.station}
                </Text>
              </Button>
              <Text note style={styles.smallSize} note>
                {nycTime.toLocaleString()}
              </Text>
            </Body>
            <Right>
              <Text note style={checkStatus(station.status)}>
                {station.status}
              </Text>
            </Right>
          </ListItem>
        </List>
      );
    });
  }
};
