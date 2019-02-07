import React, { Component } from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import { createBottomTabNavigator, createAppContainer } from "react-navigation";

import TrainStatus from "./components/TrainStatus";

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
  Home: App,
  Status: TrainStatus
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
