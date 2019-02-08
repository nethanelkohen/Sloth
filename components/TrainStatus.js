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

export default class TrainStatus extends Component {
  state = {
    stations: []
  };

  componentDidMount = () => {
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
        if (arg == "smooth") {
          return styles.green;
        } else if (arg == "slow" || "crowded") {
          return styles.red;
        }
      }

      storeData = async station => {
        store.save("station", {
          stationChoice: station
        });
      };

      return (
        <ListItem avatar key={station.id}>
          <Left>
            <Button
              transparent
              onPress={() => {
                storeData(station.station);
                this.props.navigation.navigate("StationDetails");
              }}
            >
              <Icon>🚂</Icon>
            </Button>
          </Left>
          <Body>
            <Text style={{ fontSize: 22 }}>{station.station}</Text>
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
