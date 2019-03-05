import React, { Component } from "react";
import { StyleSheet, WebView, Platform, View } from "react-native";
import { Container, Header, Content, Body, Text } from "native-base";
import { NavigationEvents } from "react-navigation";
import store from "react-native-simple-store";
import fetchData from "../utils/fetchData";
import RenderStations from "../functional/RenderStations";
import styles from "../styles/styles";

export default class TrainStatus extends Component {
  state = {
    mtaResponse: {}
  };

  getUpdates = () => {
    fetchData("mta/status", "get").then(res => {
      res.slice(8, 9).map(trains => {
        this.setState({ mtaResponse: trains });
      });
    });
  };

  render() {
    const { mtaResponse } = this.state;

    return (
      <Container style={styles.container}>
        <NavigationEvents onDidFocus={() => this.getUpdates()} />
        <Header>
          <Text>Status: {mtaResponse.status}</Text>
        </Header>
        <View>
          <Text>Here's what the MTA is saying:</Text>
        </View>
        <WebView
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{ html: mtaResponse.text }}
          style={{ marginTop: "20%" }}
        />
      </Container>
    );
  }
}
