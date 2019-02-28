import React from "react";
import { Icon } from "native-base";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";

import TrainStatus from "./components/TrainStatus";
import Post from "./components/Post";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import StationDetails from "./components/StationDetails";
import Profile from "./components/Profile";

// ADD VETTING FUNC

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
