import React, { Component } from "react";
import { Alert } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text,
  Body
} from "native-base";
import store from "react-native-simple-store";
import fetchData from "../utils/fetchData";

export default class LogIn extends Component {
  state = {
    username: "",
    pasword: ""
  };

  buttonPress = () => {
    const { username } = this.state;
    if (username.length < 4) {
      return Alert.alert("Username must be at least 4 characters");
    }

    fetchData(
      "auth/login",
      "post",
      {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      JSON.stringify(this.state)
    ).then(userRes => {
      store.save("homeStation", { homeStation: userRes.userInfo.home_station });
      store.save("token", { token: userRes.token });
      store.save("userId", { userId: userRes.user });
    });
  };

  render() {
    return (
      <Container>
        <Header>
          <Text>Log In</Text>
        </Header>
        <Content>
          <Form>
            <Item>
              <Input
                placeholder="Username"
                value={this.state.username}
                onChangeText={username => this.setState({ username })}
                autoCapitalize="none"
              />
            </Item>
            <Item>
              <Input
                placeholder="Password"
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                secureTextEntry={true}
                autoCapitalize="none"
              />
            </Item>

            <Body>
              <Button
                onPress={() => this.buttonPress()}
                style={{ marginTop: 20 }}
              >
                <Text>Log In!</Text>
              </Button>
            </Body>
          </Form>
        </Content>
      </Container>
    );
  }
}
