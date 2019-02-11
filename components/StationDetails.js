import React, { Component } from "react";
import { Container, Header, Text, Button, Body } from "native-base";
import { View } from "react-native";
import store from "react-native-simple-store";
import { NavigationEvents } from "react-navigation";

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

    this.getStation();
    this.getLastPost();
  };

  getStation = async () => {
    let { station } = this.state;

    const url = `http://localhost:3000/station/${station}`;
    await fetch(url)
      .then(res => res.json())
      .then(data => this.setState({ stationData: data.message }))
      .catch(err => err);
  };

  getLastPost = async () => {
    let { station } = this.state;

    const url = `http://localhost:3000/post/one/${station}`;
    await fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ postData: data.message });
        // this.setState({ score: data.mes });
        data.message.map(post => {
          this.setState({ score: post.vetting_score, postId: post.id });
        });
      })
      .catch(err => err);
  };

  renderStationData = () => {
    let { stationData } = this.state;

    if (stationData !== null) {
      return (
        <Container
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>{stationData.station}</Text>
          {stationData.status == null ? (
            <Body>
              <Text>No update.</Text>
              <Button onPress={() => this.props.navigation.navigate("Post")}>
                <Text>Make an update</Text>
              </Button>
            </Body>
          ) : (
            <Text>Status Update: {stationData.status}</Text>
          )}
        </Container>
      );
    } else return null;
  };

  incrementScore = () => {
    const { clicked } = this.state;

    this.setState(prevState => {
      return {
        score: prevState.score + 1,
        clicked: true
      };
    });
    this.updateScore("increment");
  };

  decrementScore = () => {
    const { clicked } = this.state;

    this.setState(prevState => {
      return {
        score: prevState.score - 1,
        clicked: true
      };
    });
    this.updateScore("decrement");
  };

  updateScore = async arg => {
    let { postId } = this.state;

    const url = `http://localhost:3000/post/${arg}/${postId}`;

    await fetch(url, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
      .catch(err => console.error(err));
  };

  renderPostData = () => {
    let { postData, score } = this.state;

    if (postData !== null) {
      return postData.map(post => {
        let nycTime = new Date(post.updatedAt).toLocaleString("en-US", {
          timeZone: "America/New_York"
        });
        return (
          <Container
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
            key={post.id}
          >
            <Text>
              Latest Post made at {nycTime} for {post.station}
            </Text>
            <Text>Comments:{post.comments ? post.comments : null}</Text>
            <Text>
              {post.status_updated} for {post.train}
            </Text>
            <Text>Validity Score: {score}</Text>
            <Button onPress={this.incrementScore}>
              <Text>⬆️</Text>
            </Button>
            <Button onPress={this.decrementScore}>
              <Text>⬇️</Text>
            </Button>
          </Container>
        );
      });
    } else return null;
  };

  render() {
    let { station, clicked } = this.state;
    console.log(clicked);

    return (
      <Container>
        <NavigationEvents onDidFocus={() => this.getStore()} />
        <Header>
          <Text> Station: {station} </Text>
        </Header>
        {this.renderStationData()}
        {this.renderPostData()}
      </Container>
    );
  }
}
