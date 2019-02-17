import React from "react";
import { View } from "react-native";
import { Body, Button, Text } from "native-base";

export default ({ props }) => {
  return (
    <View>
      {props ? (
        <Body>
          <Text>{props.station}</Text>
          {props.status == null ? (
            <Body>
              <Text>No update.</Text>
              <Button onPress={() => this.props.navigation.navigate("Post")}>
                <Text>Make an update</Text>
              </Button>
            </Body>
          ) : (
            <Text>Current Status Update: {props.status}</Text>
          )}
        </Body>
      ) : null}
    </View>
  );
};
