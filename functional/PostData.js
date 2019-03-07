import React from "react";
import checkStatus from "../utils/checkStatus";
import { ListItem, Text, Body, Button, Content } from "native-base";
import styles from "../styles/styles";

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
            <Text style={styles.smallSize}>{nycTime}:</Text>
            <Text style={styles.smallSize}>
              {post.comments ? `comments: ${post.comments}` : null}
            </Text>
            <Text style={styles.smallSize} note>
              {post.train} train
            </Text>
            <Text note style={checkStatus(post.status_update)}>
              {post.status_update}
            </Text>
          </Body>
          <Body>
            <Body>
              <Text style={styles.smallSize}>
                Upvotes: {score[0].vetting_score}
              </Text>
            </Body>

            <Body
              style={{
                flexDirection: "row",
                justifyContent: "center"
              }}
            >
              <Button primary onPress={() => counter("increment", post.id)}>
                <Text>⬆️</Text>
              </Button>
              <Button primary onPress={() => counter("decrement", post.id)}>
                <Text>⬇️</Text>
              </Button>
            </Body>
          </Body>
        </ListItem>
      );
    });
  }
};
