import React from "react";
import { Card, CardItem, Body, Text } from "native-base";
import styles from "../styles/styles";

export default ({ backEndRes }) => {
  if (!backEndRes) return null;
  else
    return (
      <Card style={styles.card}>
        <CardItem>
          <Body>
            <Text style={styles.size}>{backEndRes}</Text>
          </Body>
        </CardItem>
      </Card>
    );
};
