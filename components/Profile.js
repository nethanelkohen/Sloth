import React, { Component } from "react";
import { Container, Header, Text, Button, Body } from "native-base";
import { NavigationEvents } from "react-navigation";
import store from "react-native-simple-store";

export default class Profile extends Component {
  state = {
    response: {}
  };

  getToken = () => store.get("token").then(res => this.getProfile(res.token));

  getProfile = token => {
    const url = "http://localhost:3000/auth/profile";

    fetch(url, {
      method: "get",
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded"
      })
    })
      .then(response => response.json())
      .then(newRes => this.setState({ response: newRes }))
      .catch(err => console.error(err));
  };

  renderBody = () => {
    const { response } = this.state;
    if (response) {
      return (
        <Body>
          <Text>Username :{response.username}</Text>
          <Text>Home Station: {response.home_station}</Text>
        </Body>
      );
    } else return null;
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
        {this.renderBody()}
      </Container>
    );
  }
}
