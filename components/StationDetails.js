import React, { Component } from "react";
import { Container, Header, Text, Button } from "native-base";
import { View } from "react-native";
import store from "react-native-simple-store";
import { NavigationEvents } from "react-navigation";

export default class StationDetails extends Component {
  state = {
    station: ""
  };

  getStore = async () => {
    console.log("get store ran");

    await store
      .get("station")
      .then(res => {
        console.log(res);

        this.setState({ station: res.stationChoice });
      })
      .catch(err => err);
  };

  render() {
    console.log("state here:::", this.state);

    return (
      <Container>
        <NavigationEvents onDidFocus={() => this.getStore()} />
        <Header>
          <Text> Station Details: {this.state.station} </Text>
        </Header>
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text>Details Screen</Text>
        </View>
      </Container>
    );
  }
}
