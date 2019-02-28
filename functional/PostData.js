import React from "react";
import checkStatus from "../utils/checkStatus";
import { ListItem, Text, Body, Button } from "native-base";

export default ({ postData, counter }) => {
  if (!postData) return null;
  else {
    return postData.map(post => {
      let nycTime = new Date(post.updatedAt).toLocaleString("en-US", {
        timeZone: "America/New_York"
      });

      let score = postData.filter(item => item.id === post.id);

      return (
        <ListItem key={post.id}>
          <Body>
            <Text>{nycTime}:</Text>
            <Text note>
              Comments: {post.comments ? post.comments : "no comments"}
            </Text>
            <Text note>
              {post.status_updated} for {post.train} train
            </Text>
            <Text note style={checkStatus(post.status_update)}>
              {post.status_update}
            </Text>
          </Body>
          <Text>Validity Score: {score[0].vetting_score}</Text>
          <Button onPress={() => counter("increment", post.id)}>
            <Text>⬆️</Text>
          </Button>
          <Button onPress={() => counter("decrement", post.id)}>
            <Text>⬇️</Text>
          </Button>
        </ListItem>
      );
    });
  }
};
