import React, { Component } from "react";
import { Container, Header, Text, Button, Body } from "native-base";
import { View } from "react-native";
import store from "react-native-simple-store";
import { NavigationEvents } from "react-navigation";

export default class StationDetails extends Component {
  state = {
    station: "",
    stationData: null
  };

  getStore = async () => {
    await store
      .get("station")
      .then(res => this.setState({ station: res.stationChoice }))
      .catch(err => err);
  };

  getStation = async () => {
    let { station } = this.state;

    const url = `http://localhost:3000/station/${station}`;
    await fetch(url)
      .then(res => res.json())
      .then(data => {
        this.setState({ stationData: data.message });
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

  render() {
    return (
      <Container>
        <NavigationEvents
          onDidFocus={() => {
            this.getStore();
            this.getStation();
          }}
        />
        <Header>
          <Text> Station: {this.state.station} </Text>
        </Header>
        {this.renderStationData()}
      </Container>
    );
  }
}
