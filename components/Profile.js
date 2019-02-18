import React, { Component } from "react";
import { Container, Header, Text } from "native-base";
import { NavigationEvents } from "react-navigation";
import store from "react-native-simple-store";
import fetchData from "../utils/fetchData";
import RenderHome from "../functional/RenderHome";
import { StyleSheet, View, TextInput } from "react-native";
import { Permissions, Notifications } from "expo";

const PUSH_REGISTRATION_ENDPOINT = "http://4ba87e19.ngrok.io/token";

export default class Profile extends Component {
  state = {
    response: {},
    notification: {}
  };

  componentDidMount() {
    this.registerForPushNotificationsAsync();

    this._notificationSubscription = Notifications.addListener(
      this.handleNotification
    );
  }

  registerForPushNotificationsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") {
      return;
    }
    let token = await Notifications.getExpoPushTokenAsync();

    fetch(PUSH_REGISTRATION_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: { value: token },
        user: {
          username: "warly",
          name: "Dan Ward"
        }
      })
    });
  };

  handleNotification = notification =>
    this.setState({ notification: notification });

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
