import React, { Component } from "react";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Text,
  Body,
  Icon,
  Picker
} from "native-base";
import { Alert, View } from "react-native";
import { NavigationEvents } from "react-navigation";
import store from "react-native-simple-store";
import fetchData from "../utils/fetchData";
import { Notifications, Permissions } from "expo";
import styles from "../styles/styles";
import ProfileRes from "../functional/ProfileRes";
import ShowHeader from "../functional/Headers";
import MyButton from "../functional/MyButton";
import { setLightEstimationEnabled } from "expo/build/AR";

export default class Profile extends Component {
  state = {
    response: {},
    notification: {},
    userId: null,
    backEndRes: null,
    username: "",
    password: "",
    home_station: undefined,
    onboarding_completed: true,
    notifications_setting: 0,
    showSignUp: false
  };

  componentDidMount() {
    this._notificationSubscription = Notifications.addListener(
      this.handleNotification
    );
  }

  handleNotification = notification => {
    this.setState({ notification: notification });
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

  logOut = () => {
    store.delete("userId");
    store.delete("token");
    store.delete("homeStation");
    this.setState({
      response: {},
      backEndRes: "Logged out!",
      username: "",
      password: "",
      home_station: undefined,
      onboarding_completed: true,
      notifications_setting: 0
    });
  };

  signUp = async () => {
    let { username, home_station } = this.state;
    if (username.length < 4) {
      return Alert.alert("Username must be at least 4 characters");
    }

    if (home_station == undefined) {
      return Alert.alert("Please choose a home station");
    }

    fetchData(
      "user",
      "post",
      {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      JSON.stringify(this.state)
    )
      .then(async user => {
        await store.save("userId", { userId: user.results.id });
        await this.setState({ userId: user.results.id });
        await this.registerForPushNotificationsAsync();
      })
      // .then(argRes => Alert.alert(argRes.message))
      .catch(err => console.error(err));

    setTimeout(() => this.logIn(), 1000);
  };

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== "granted") {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== "granted") {
      alert("here is alert:" + finalStatus, existingStatus);
      return;
    }
    let token = await Notifications.getExpoPushTokenAsync();

    const url = `https://slothbackend.herokuapp.com/token/${this.state.userId}`;
    // const url = `https://2c5e7991.ngrok.io/token/${this.state.userId}`;

    await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        token: { token }
      })
    }).then(res => console.log("response from token registration", res));
  };

  logIn = () => {
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
      if (userRes.message == "Username not found") {
        return this.setState({ backEndRes: userRes.message });
      } else {
        this.setState({ backEndRes: userRes.message });

        if (userRes.user) {
          store.save("homeStation", { homeStation: userRes.user.home_station });
          store.save("userId", { userId: userRes.user.id });
        }

        if (userRes.token) {
          store.save("token", { token: userRes.token });
        }

        setTimeout(() => this.props.navigation.navigate("Status"), 1000);
      }
    });
  };

  showProfileInfo = response => {
    if (Object.keys(response).length === 0) return null;
    else {
      return (
        <View>
          <Body>
            <Text style={styles.size}>User: {response.username}</Text>
            <Text style={styles.size}>
              Home Station: {response.home_station}
            </Text>
          </Body>
          <Body>
            <MyButton onPress={() => this.logOut()} props={"Log Out"} />
          </Body>
        </View>
      );
    }
  };

  showSignUpForm = (showSignUp, response) => {
    if (response && response.username) return null;

    if (showSignUp) {
      return (
        <View>
          <Body>
            <MyButton
              onPress={() =>
                this.setState(prevState => ({
                  showSignUp: !prevState.showSignUp
                }))
              }
              props={!showSignUp ? `Sign Up` : `Log In`}
            />
          </Body>

          <Form>
            <Item floatingLabel>
              <Label style={styles.smallSize}>Username</Label>
              <Input
                value={this.state.username}
                onChangeText={username => this.setState({ username })}
                autoCapitalize="none"
                style={styles.smallSize}
              />
            </Item>
            <Item floatingLabel>
              <Label style={styles.smallSize}>Password</Label>
              <Input
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                autoCapitalize="none"
                secureTextEntry={true}
                style={styles.smallSize}
              />
            </Item>
            <Item picker style={{ marginTop: "2%" }}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Select your home station"
                placeholderStyle={styles.smallSize}
                itemTextStyle={styles.smallSize}
                placeholderIconColor="#007aff"
                selectedValue={this.state.home_station}
                onValueChange={value => this.setState({ home_station: value })}
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
                placeholder="Select notifications (default: none)"
                placeholderStyle={styles.smallSize}
                itemTextStyle={styles.smallSize}
                placeholderIconColor="#007aff"
                selectedValue={this.state.notifications_setting}
                onValueChange={value =>
                  this.setState({ notifications_setting: value })
                }
              >
                <Picker.Item label="Never alert me" value="0" />
                {/* <Picker.Item label="Alert me daily at 8:30 AM" value="1" /> */}
                <Picker.Item
                  label="Whenever there's a delay at my home station"
                  value="1"
                />
              </Picker>
            </Item>
            <Body style={{ marginTop: "5%" }}>
              <MyButton
                onPress={() => this.signUp()}
                props={"Go!"}
                icon={"person-add"}
              />
            </Body>
          </Form>
        </View>
      );
    } else {
      return (
        <View>
          <Body>
            <MyButton
              onPress={() =>
                this.setState(prevState => ({
                  showSignUp: !prevState.showSignUp
                }))
              }
              props={!showSignUp ? `Sign Up` : `Log In`}
            />
          </Body>
          <Form>
            <Item floatingLabel>
              <Label style={styles.smallSize}>Username</Label>
              <Input
                value={this.state.username}
                onChangeText={username => this.setState({ username })}
                autoCapitalize="none"
                style={styles.smallSize}
              />
            </Item>
            <Item floatingLabel>
              <Label style={styles.smallSize}>Password</Label>
              <Input
                value={this.state.password}
                onChangeText={password => this.setState({ password })}
                secureTextEntry={true}
                autoCapitalize="none"
                style={styles.smallSize}
              />
            </Item>
            <Body>
              <MyButton
                onPress={() => this.logIn()}
                props={"Go!"}
                icon={"person"}
              />
            </Body>
          </Form>
        </View>
      );
    }
  };

  render() {
    const { showSignUp, response, backEndRes } = this.state;

    return (
      <Container style={styles.container} padder>
        <NavigationEvents onDidFocus={() => this.getToken()} />
        <ShowHeader props={"Profile"} />
        {/* <Content style={{ marginTop: "2%" }}> */}
        <Content padder>
          {this.showSignUpForm(showSignUp, response)}
          {this.showProfileInfo(response)}
          <ProfileRes backEndRes={backEndRes} />
        </Content>
      </Container>
    );
  }
}
