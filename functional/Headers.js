import React from "react";
import { Header, Text } from "native-base";
import styles from "../styles/styles";

export default ({ props }) => {
  if (!props) {
    return null;
  }

  return (
    <Header>
      <Text style={styles.size}>{props}</Text>
    </Header>
  );
};
