import React from "react";
import { View, WebView } from "react-native";
import { Text } from "native-base";
import styles from "../styles/styles";

export default ({ mtaResponse }) => {
  let css = `<style> body { 
    font-size: 20px; 
    font-family: "Arial";
    background-color: #f2f2f2;
    }</style>`;

  if (!mtaResponse) {
    return (
      <View style={styles.loading}>
        <Text style={{ fontSize: 22 }}>LOADING....</Text>
      </View>
    );
  } else {
    return mtaResponse && mtaResponse.text == "" ? (
      <View style={styles.nothing}>
        <Text style={{ fontSize: 22 }}>Nothing from the MTA at the moment</Text>
      </View>
    ) : (
      <View style={styles.webview}>
        <WebView
          javaScriptEnabled={true}
          domStorageEnabled={true}
          source={{ html: mtaResponse.text + css }}
          scalesPageToFit={false}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
};
