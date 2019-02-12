import React, { Component } from "react";
import { Container, Header, Text, Button, Body } from "native-base";
import { NavigationEvents } from "react-navigation";
import store from "react-native-simple-store";
import fetchData from "../utils/fetchData";
import RenderHome from "../functional/RenderHome";

export default class Profile extends Component {
  state = {
    response: {}
  };

  getToken = () => store.get("token").then(res => this.getProfile(res.token));

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
    const { response } = this.state;
    return (
      <Container>
        <NavigationEvents onDidFocus={() => this.getToken()} />
        <Header>
          <Text>
            Profile Page for {response.username ? response.username : null}
          </Text>
        </Header>
        <RenderHome props={response} />
      </Container>
    );
  }
}
