import React, { Component } from "react";
import { Alert, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Button,
  Label,
  Text,
  Body,
  Card,
  CardItem
} from "native-base";
import store from "react-native-simple-store";
import fetchData from "../utils/fetchData";
import globalStyles from "../styles/styles";

export default class LogIn extends Component {
  state = {
    username: "",
    pasword: "",
    backEndRes: null
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
      this.setState({ backEndRes: userRes.message });

      store.save("homeStation", { homeStation: userRes.userInfo.home_station });
      store.save("token", { token: userRes.token });
      store.save("userId", { userId: userRes.user });
    });
  };

  render() {
    const { backEndRes } = this.state;
    return (
      <Container style={globalStyles.container} padder>
        <Header>
          <Text>Log In</Text>
        </Header>
        <Content style={{ marginTop: "2%" }}>
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input
                value={this.state.username}
                onChangeText={username => this.setState({ username })}
                autoCapitalize="none"
              />
            </Item>
            <Item floatingLabel>
              <Label>Password</Label>
              <Input
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                secureTextEntry={true}
                autoCapitalize="none"
              />
            </Item>
            <Body>
              <Button
                large
                onPress={() => this.buttonPress()}
                style={{ marginTop: 20 }}
              >
                <Text>Log In!</Text>
              </Button>
            </Body>
          </Form>
          {backEndRes ? (
            <Card style={styles.card}>
              <CardItem>
                <Body>
                  <Text style={globalStyles.error}>{backEndRes}</Text>
                </Body>
              </CardItem>
            </Card>
          ) : null}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    marginTop: "10%"
  }
});
