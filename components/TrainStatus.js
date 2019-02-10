import React, { Component } from "react";
import { StyleSheet, Image, View } from "react-native";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Button,
  Text,
  Icon
} from "native-base";
import store from "react-native-simple-store";
import { NavigationEvents } from "react-navigation";

export default class TrainStatus extends Component {
  state = {
    stations: []
  };

  getUpdates = () => {
    const url = "http://localhost:3000/station/all";
    fetch(url)
      .then(res => res.json())
      .then(stations => {
        this.setState({ stations: stations.message });
      });
  };

  renderStations = () => {
    let { stations } = this.state;

    return stations.map(station => {
      let nycTime = new Date(station.updatedAt).toLocaleString("en-US", {
        timeZone: "America/New_York"
      });
      nycTime = new Date(nycTime);

      function checkStatus(arg) {
        if (typeof arg == "object") return;

        if (arg.includes("smooth") == 1) return styles.green;
        else if (arg.includes("not running") == 1) return styles.red;
        else if (arg.includes("slow") == 1) return styles.yellow;
        else if (arg.includes("crowded") == 1) return styles.yellow;
        else return styles.black;
      }

      storeData = async station => {
        store.save("station", {
          stationChoice: station
        });
      };

      return (
        <ListItem avatar key={station.id}>
          {/* <Left>
            <Button
              transparent
              onPress={() => {
                storeData(station.station);
                this.props.navigation.navigate("StationDetails");
              }}
            >
              <Icon>🚂</Icon>
            </Button>
          </Left> */}
          <Body>
            <Button
              transparent
              onPress={() => {
                storeData(station.station);
                this.props.navigation.navigate("StationDetails");
              }}
            >
              <Text style={{ fontSize: 26, color: "black" }}>
                {station.station}
              </Text>
            </Button>
            <Text style={{ fontSize: 14 }} note>
              last updated: {nycTime.toLocaleString()}
            </Text>
          </Body>
          <Right>
            {/* <Button transparent> */}
            <Text note style={checkStatus(station.status)}>
              {station.status}
            </Text>
            {/* </Button> */}
          </Right>
        </ListItem>
      );
    });
  };

  render() {
    return (
      <Container>
        <NavigationEvents onDidFocus={() => this.getUpdates()} />
        <Header />
        <Content>
          <List>{this.renderStations()}</List>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  green: {
    color: "#0acc0a",
    fontSize: 20
  },
  red: {
    color: "#ff0000",
    fontSize: 20
  },
  yellow: {
    color: "#d3c200",
    fontSize: 20
  },
  black: {
    color: "#000000",
    fontSize: 20
  }
});

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center"
//   },
//   text: {
//     marginTop: 50,
//     fontSize: 50,
//     fontFamily: "Arial"
//   },
//   image: {
//     flex: 1,
//     width: "100%",
//     resizeMode: "contain"
//   }
// });
