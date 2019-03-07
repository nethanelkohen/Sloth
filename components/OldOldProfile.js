import React, { Component } from "react";
import { Container } from "native-base";
import { NavigationEvents } from "react-navigation";
import store from "react-native-simple-store";
import fetchData from "../utils/fetchData";

export default class Profile extends Component {
  state = {
    response: {},
    notification: {},
    userId: null
  };

  getToken = () => {
    store.get("userId").then(res => {
      if (res === null) return;
      this.setState({ userId: res.userId });
    });

    store.get("token").then(res => {
      if (res == null) return;
      this.getProfile(res.token);
    });
  };

  getProfile = token => {
    fetchData(
      "auth/profile",
      "get",
      new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded"
      })
    ).then(newRes => this.setState({ response: newRes }));
  };

  render() {
    return (
      <Container>
        <NavigationEvents onDidFocus={() => this.getToken()} />
      </Container>
    );
  }
}
