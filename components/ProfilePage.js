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
  Picker
} from "native-base";

export default class FormExample extends Component {
  state = {
    username: "",
    pasword: "",
    home_station: undefined,
    onboarding_completed: true,
    notifications_setting: 0
  };

  buttonPress = () => {
    const url = "http://localhost:3000/user";

    fetch(url, {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state)
    })
      .then(function(response) {
        return response.json();
      })
      .then(function(newRes) {
        console.log("jhere is new res", newRes);
      })
      .catch(err => console.log(err));
  };

  handleChange = event => {
    this.setState({ username: event.target.value });
  };

  setStation = value => {
    this.setState({
      home_station: value
    });
  };

  setNotifications = value => {
    this.setState({
      notifications_setting: value
    });
  };

  render() {
    return (
      <Container>
        <Header>
          <Text>Create an account</Text>
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

            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your station"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.home_station}
                onValueChange={this.setStation}
              >
                <Picker.Item
                  label="Queensboro Plaza"
                  value="Queensboro Plaza"
                />
                <Picker.Item label="39th Ave" value="39th Ave" />
                <Picker.Item label="36th Ave" value="36th Ave" />
                <Picker.Item label="Broadway" value="Broadway" />
                <Picker.Item label="30th Ave" value="30th Ave" />
                <Picker.Item label="Astoria Blvd" value="Astoria Blvd" />
                <Picker.Item label="Ditmars" value="Ditmars" />
              </Picker>
            </Item>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your notifications settings (default: none)"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.notifications_setting}
                onValueChange={this.setNotifications}
              >
                <Picker.Item label="Never alert me" value="0" />
                <Picker.Item label="Alert me daily at 8:30 AM" value="1" />
                <Picker.Item label="Whenever there's a delay" value="2" />
              </Picker>
            </Item>
            <Button onPress={this.buttonPress}>
              <Text>Sign Up!</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
