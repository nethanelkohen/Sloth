import React from "react";
import { View } from "react-native";
import { Body, Button, Text } from "native-base";

export default ({ props }) => {
  const showStatus = () => {
    if (props.status == null) {
      <Body>
        <Text>No update.</Text>
        <Button onPress={() => this.props.navigation.navigate("Post")}>
          <Text>Make an update</Text>
        </Button>
      </Body>;
    } else return <Text>Current Status Update: {props.status}</Text>;
  };

  return (
    <View>
      {props ? (
        <Body>
          <Text>{props.station}</Text>
          {showStatus()}
        </Body>
      ) : null}
    </View>
  );
};
