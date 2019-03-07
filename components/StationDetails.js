import React, { Component } from "react";
import { Container, List, Content } from "native-base";
import store from "react-native-simple-store";
import { NavigationEvents } from "react-navigation";
import StatusUpdate from "../functional/StatusUpdate";
import PostData from "../functional/PostData";
import Headers from "../functional/Headers";
import fetchData from "../utils/fetchData";
import styles from "../styles/styles";

export default class StationDetails extends Component {
  state = {
    station: "",
    stationData: null,
    postData: null
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
      // data.message.map(post => this.setState({ score: post.vetting_score }));
    });
  };

  counter = (arg, arg2) => {
    const { postData } = this.state;
    const newArray = [...postData];

    const test = postData.filter(post => post.id === arg2);
    const index = postData.indexOf(test[0]);

    if (arg === "increment") {
      newArray[index].vetting_score++;

      this.setState({ postData: newArray });

      this.updateScore("increment", arg2);
    } else if (arg === "decrement") {
      newArray[index].vetting_score--;

      this.setState({ postData: newArray });

      this.updateScore("decrement", arg2);
    }
  };

  updateScore = async (arg, arg2) => {
    fetchData(`post/${arg}/${arg2}`, "put", {
      Accept: "application/json",
      "Content-Type": "application/json"
    });
  };

  render() {
    let { station, stationData } = this.state;

    return (
      <Container style={styles.container}>
        <NavigationEvents onDidFocus={() => this.getStore()} />
        <Headers props={`Station: ${station}`} />
        <Content>
          <StatusUpdate props={stationData} />
          <List>
            <PostData {...this.state} counter={this.counter} />
          </List>
        </Content>
      </Container>
    );
  }
}
