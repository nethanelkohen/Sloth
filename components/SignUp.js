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
  Body,
  Label
} from "native-base";
import fetchData from "../utils/fetchData";
import styles from "../styles/styles";

export default class SignUp extends Component {
  state = {
    username: "",
    pasword: "",
    home_station: undefined,
    onboarding_completed: true,
    notifications_setting: 0
  };

  buttonPress = arg => {
    let { username, home_station } = this.state;
    if (username.length < 4) {
      return Alert.alert("Username must be at least 4 characters");
    }

    if (home_station == undefined) {
      return Alert.alert("Please choose a home station");
    }

    arg
      .then(newRes => Alert.alert(newRes.message))
      .catch(err => console.error(err));

    setTimeout(() => this.props.navigation.navigate("LogIn"), 1000);
  };

  setStation = value => this.setState({ home_station: value });

  setNotifications = value => this.setState({ notifications_setting: value });

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Text>Create an account</Text>
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
                autoCapitalize="none"
                secureTextEntry={true}
              />
            </Item>
            <Item picker style={{ marginTop: "2%" }}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Select your home station"
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
            <Item picker style={{ marginTop: "2%" }}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
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
            <Body style={{ marginTop: "5%" }}>
              <Button
                iconLeft
                large
                onPress={() =>
                  this.buttonPress(
                    fetchData(
                      "user",
                      "post",
                      {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                      },
                      JSON.stringify(this.state)
                    )
                  )
                }
              >
                <Icon name="person-add" />
                <Text>Sign Up!</Text>
              </Button>
            </Body>
          </Form>
        </Content>
      </Container>
    );
  }
}
