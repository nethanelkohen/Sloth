import React from "react";
import { Icon } from "native-base";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";

import TrainStatus from "./components/TrainStatus";
import Post from "./components/Post";
import StationDetails from "./components/StationDetails";
import Mta from "./components/Mta";
import Profile from "./components/Profile";

const TabNavigator = createBottomTabNavigator({
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
  Mta: {
    screen: Mta,

    navigationOptions: {
      tabBarLabel: "MTA",
      tabBarOptions: {
        showIcon: true
      },
      tabBarIcon: () => <Icon name="warning" size={25} color="#900" />
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
