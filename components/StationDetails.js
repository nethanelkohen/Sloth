import React, { Component } from "react";
import { Container, Header, List, Text, Content } from "native-base";
import store from "react-native-simple-store";
import { NavigationEvents } from "react-navigation";
import StatusUpdate from "../functional/StatusUpdate";
import PostData from "../functional/PostData";
import fetchData from "../utils/fetchData";

export default class StationDetails extends Component {
  state = {
    station: "",
    stationData: null,
    postData: null,
    score: 0,
    postId: null
  };

  getStore = async () => {
    await store
      .get("station")
      .then(res => this.setState({ station: res.stationChoice }))
      .catch(err => err);

    fetchData(`station/${this.state.station}`, "get").then(data =>
      this.setState({ stationData: data.message })
    );

    fetchData(`post/all/${this.state.station}`, "get").then(data => {
      this.setState({ postData: data.message });
      data.message.map(post => {
        this.setState({ score: post.vetting_score, postId: post.id });
      });
    });
  };

  counter = arg => {
    if (arg === "increment") {
      this.setState(prevState => {
        return {
          score: prevState.score + 1,
          clicked: true
        };
      });
      this.updateScore("increment");
    } else if (arg === "decrement") {
      this.setState(prevState => {
        return {
          score: prevState.score - 1,
          clicked: true
        };
      });
      this.updateScore("decrement");
    }
  };

  updateScore = async arg => {
    const { postId } = this.state;

    fetchData(`post/${arg}/${postId}`, "put", {
      Accept: "application/json",
      "Content-Type": "application/json"
    });
  };

  render() {
    let { station, stationData } = this.state;

    return (
      <Container>
        <NavigationEvents onDidFocus={() => this.getStore()} />
        <Header>
          <Text> Station: {station} </Text>
        </Header>
        <Content>
          <StatusUpdate props={stationData} />
          <Text style={{ fontSize: 20 }}>Last 5 posts</Text>
          <List>
            <PostData {...this.state} counter={this.counter} />
          </List>
        </Content>
      </Container>
    );
  }
}
