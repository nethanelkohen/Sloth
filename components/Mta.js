import React, { Component } from "react";
import { Container, Header, Text } from "native-base";
import { NavigationEvents } from "react-navigation";
import RenderMta from "../functional/RenderMta";
import fetchData from "../utils/fetchData";
import styles from "../styles/styles";
import store from "react-native-simple-store";
import changeTime from "../utils/changeTime";
import changeStation from "../utils/changeStation";

export default class TrainStatus extends Component {
  state = {
    mtaResponse: null,
    mtaSchedule: []
  };

  getUpdates = () => {
    fetchData("mta/status", "get").then(res => {
      res.slice(8, 9).map(trains => {
        this.setState({ mtaResponse: trains });
      });
    });

    // fetchData("mta/schedule", "get").then(res => {
    //   this.setState({ mtaSchedule: res });
    // });
  };

  //   createSchedule = () => {
  //     const { mtaSchedule } = this.state;
  //     if (mtaSchedule && mtaSchedule.schedule) {
  //       const status = Object.keys(mtaSchedule.schedule);
  //       return (
  //         <View>
  //           {status.map((key, i) => {
  //             return mtaSchedule.schedule[key].N.map(north => {
  //               return (
  //                 <View>
  //                   <Text>{changeStation(key)}</Text>
  //                   <Text>north: {changeTime(north.arrivalTime)}</Text>
  //                 </View>
  //               );
  //             });
  //           })}
  //           {status.map((key, i) => {
  //             return mtaSchedule.schedule[key].S.map(south => {
  //               return (
  //                 <View>
  //                   <Text>south: {changeTime(south.arrivalTime)}</Text>
  //                 </View>
  //               );
  //             });
  //           })}
  //         </View>
  //       );
  //     }
  //   };

  render() {
    const { mtaResponse } = this.state;

    return (
      <Container style={styles.container}>
        <NavigationEvents onDidFocus={() => this.getUpdates()} />
        <Header>
          <Text style={{ fontSize: 22 }}>N W Updates</Text>
        </Header>
        <RenderMta mtaResponse={mtaResponse} />
      </Container>
    );
  }
}
