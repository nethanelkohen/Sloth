import React from "react";
import { Button, Text, Icon } from "native-base";
import styles from "../styles/styles";

export default ({ onPress, props, icon }) => {
  return (
    <Button large onPress={() => onPress()} style={{ marginTop: 20 }}>
      {icon ? <Icon name={icon} /> : null}
      <Text style={styles.smallSize}>{props}</Text>
    </Button>
  );
};
