import React from "react";
import { View } from "react-native";
import { Body, Text } from "native-base";
import checkStatus from "../utils/checkStatus";
import MyButton from "../functional/MyButton";
import styles from "../styles/styles";

export default ({ props }) => {
  const showStatus = () => {
    if (props.status == null) {
      return (
        <Body>
          <Text style={styles.mediumSize}>No update.</Text>
          <MyButton
            onPress={() => this.props.navigation.navigate("Post")}
            props={"Make an update"}
          />
        </Body>
      );
    } else
      return (
        <View>
          <Text style={styles.size}>
            Current Status:{" "}
            <Text style={checkStatus(props.status)}>{props.status}</Text>
          </Text>
        </View>
      );
  };

  return (
    <View>
      {props ? (
        <Body>
          {showStatus()}
          <Text style={styles.mediumSize}>Last 5 posts:</Text>
        </Body>
      ) : null}
    </View>
  );
};
