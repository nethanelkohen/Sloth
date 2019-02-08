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
  Icon,
  Picker,
  Body
} from "native-base";

export default class LogIn extends Component {
  state = {
    username: "",
    pasword: ""
  };

  //   buttonPress = () => {
  //     let { username } = this.state;
  //     if (username.length < 4) {
  //       return Alert.alert("Username must be at least 4 characters");
  //     }

  //     const url = "http://localhost:3000/user";

  //     fetch(url, {
  //       method: "post",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify(this.state)
  //     })
  //       .then(response => response.json())
  //       .then(newRes => {
  //         console.log("jhere is new res", newRes);
  //       })
  //       .catch(err => console.error(err));
  //   };

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
              <Button onPress={this.buttonPress} style={{ marginTop: 20 }}>
                <Text>Log In!</Text>
              </Button>
            </Body>
          </Form>
        </Content>
      </Container>
    );
  }
}
