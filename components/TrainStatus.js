import React, { Component } from "react";
import { Container, Header, Content, List, Text } from "native-base";
import { NavigationEvents } from "react-navigation";
import store from "react-native-simple-store";
import fetchData from "../utils/fetchData";
import RenderStations from "../functional/RenderStations";
import styles from "../styles/styles";

export default class TrainStatus extends Component {
  state = {
    stations: [],
    homeStation: ""
  };

  getUpdates = () => {
    fetchData("station/all", "get").then(stations => {
      this.setState({ stations: stations.message });
    });

    store.get("homeStation").then(res => {
      if (res === null) {
        this.setState({ homeStation: "" });
      } else this.setState({ homeStation: res.homeStation });
    });
  };

  // checkUser = async store => {
  //   store.get("user").then(res => {
  //     if (res == undefined) console.log("res is undefined");
  //   });
  // };

  storeData = async station => {
    store.save("station", { stationChoice: station });
  };

  handlePress = station => {
    this.storeData(station);
    this.props.navigation.navigate("StationDetails");
  };

  render() {
    return (
      <Container style={styles.container}>
        <NavigationEvents onDidFocus={() => this.getUpdates()} />
        <Header>
          <Text style={{ fontSize: 30 }}>S L O T H</Text>
        </Header>
        <Content>
          <RenderStations {...this.state} handlePress={this.handlePress} />
        </Content>
      </Container>
    );
  }
}
