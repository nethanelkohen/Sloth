import React, { Component } from "react";
import { Container, Header, Text, Button, Body, Content } from "native-base";
import { NavigationEvents } from "react-navigation";
import store from "react-native-simple-store";
import fetchData from "../utils/fetchData";
import { Notifications } from "expo";

export default class Profile extends Component {
  state = {
    response: {},
    notification: {},
    userId: null
  };

  componentDidMount() {
    this._notificationSubscription = Notifications.addListener(
      this.handleNotification
    );
  }

  handleNotification = notification =>
    this.setState({ notification: notification });

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

  buttonPress = () => {
    store.delete("userId");
    store.delete("token");
    store.delete("homeStation");
    this.props.navigation.navigate("Status");
    this.setState({ response: {} });
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
        <Content padder>
          <Body>
            <Text>Username: {response.username}</Text>
            <Text>Home Station: {response.home_station}</Text>
            <Button
              onPress={() => this.buttonPress()}
              style={{ marginTop: 20 }}
            >
              <Text>Log Out</Text>
            </Button>
          </Body>
        </Content>
      </Container>
    );
  }
}
