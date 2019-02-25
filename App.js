import React, { Component } from "react";
import { StyleSheet, Image, View } from "react-native";
import { Icon, Text } from "native-base";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";

import TrainStatus from "./components/TrainStatus";
import Post from "./components/Post";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import StationDetails from "./components/StationDetails";
import Profile from "./components/Profile";

// ADD VETTING FUNC
class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>SLOTH</Text>
        <Image
          style={styles.image}
          source={require("./assets/sloth-logo.png")}
        />
      </View>
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  // Home: App,

  Status: {
    screen: TrainStatus,

    navigationOptions: {
      tabBarLabel: "Status",
      tabBarOptions: {
        showIcon: true
      },
      tabBarIcon: () => <Icon name="train" size={25} color="#900" />
    }
  },
  Post: {
    screen: Post,

    navigationOptions: {
      tabBarLabel: "Post",
      tabBarOptions: {
        showIcon: true
      },
      tabBarIcon: () => <Icon name="add" size={25} color="#900" />
    }
  },
  SignUp: {
    screen: SignUp,

    navigationOptions: {
      tabBarLabel: "Sign Up",
      tabBarOptions: {
        showIcon: true
      },
      tabBarIcon: () => <Icon name="person-add" size={25} color="#900" />
    }
  },
  LogIn: {
    screen: LogIn,

    navigationOptions: {
      tabBarLabel: "Log In",
      tabBarOptions: {
        showIcon: true
      },
      tabBarIcon: () => <Icon name="person" size={25} color="#900" />
    }
  },
  StationDetails: {
    screen: StationDetails,

    navigationOptions: {
      tabBarLabel: "Station Details",
      tabBarOptions: {
        showIcon: true
      },
      tabBarIcon: () => <Icon name="subway" size={25} color="#900" />
    }
  },
  Profile: {
    screen: Profile,
    navigationOptions: {
      tabBarLabel: "Profile",
      tabBarOptions: {
        showIcon: true
      },
      tabBarIcon: () => <Icon name="contact" size={25} color="#900" />
    }
  }
});

export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    marginTop: 50,
    fontSize: 50,
    fontFamily: "Arial"
  },
  image: {
    flex: 1,
    width: "100%",
    resizeMode: "contain"
  }
});
