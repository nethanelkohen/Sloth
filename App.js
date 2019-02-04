import React, { Component } from "react";
import { StyleSheet, Image, View, Text } from "react-native";

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Check the N/W</Text>
        <Image
          style={styles.image}
          source={require("./assets/sloth-logo.png")}
        />
      </View>
    );
  }
}

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
