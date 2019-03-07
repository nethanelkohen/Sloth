import React, { Component } from "react";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Icon,
  Picker,
  Body
} from "native-base";
import { Alert } from "react-native";
import fetchData from "../utils/fetchData";
import RenderPost from "../functional/RenderPost";
import MyButton from "../functional/MyButton";
import Headers from "../functional/Headers";
import styles from "../styles/styles";

export default class SignUp extends Component {
  state = {
    station: undefined,
    train: undefined,
    status_update: undefined,
    comments: null,
    photo: undefined,
    vetting_score: 0,
    updateConfirm: null
  };

  buttonPress = returnedData => {
    returnedData.then(newRes => this.setState({ updateConfirm: newRes }));
  };

  render() {
    const {
      station,
      status_update,
      train,
      comments,
      updateConfirm
    } = this.state;

    return (
      <Container style={styles.container}>
        <Headers props={"What's going on?"} />
        <Content>
          <Form>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Which station would you like to update?"
                placeholderStyle={styles.smallSize}
                itemTextStyle={styles.smallSize}
                placeholderIconColor="#007aff"
                selectedValue={station}
                onValueChange={station => this.setState({ station })}
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
                placeholder="Which train?"
                placeholderStyle={styles.smallSize}
                itemTextStyle={styles.smallSize}
                placeholderIconColor="#007aff"
                selectedValue={train}
                onValueChange={train => this.setState({ train })}
              >
                <Picker.Item label="N" value="N" />
                <Picker.Item label="W" value="W" />
              </Picker>
            </Item>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="What is the status update?"
                placeholderStyle={styles.smallSize}
                itemTextStyle={styles.smallSize}
                placeholderIconColor="#007aff"
                selectedValue={status_update}
                onValueChange={status_update =>
                  this.setState({ status_update })
                }
              >
                <Picker.Item label="not running" value="not running" />
                <Picker.Item label="delayed" value="delayed" />
                <Picker.Item label="smooth" value="smooth" />
                <Picker.Item label="crowded" value="crowded" />
                <Picker.Item label="slow" value="slow" />
              </Picker>
            </Item>
            <Item>
              <Input
                placeholder="Any comments?"
                style={styles.smallSize}
                value={comments}
                onChangeText={comments => this.setState({ comments })}
              />
            </Item>
            <Body>
              <MyButton
                onPress={() => {
                  const { station, train, status_update } = this.state;
                  if (
                    station == undefined ||
                    train == undefined ||
                    status_update == undefined
                  )
                    return Alert.alert(
                      "Please fill out the status update completely"
                    );

                  this.buttonPress(
                    fetchData(
                      "post",
                      "post",
                      {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                      },
                      JSON.stringify(this.state)
                    )
                  );
                }}
                props={"Update!"}
              />
            </Body>
          </Form>
          <RenderPost props={updateConfirm} />
        </Content>
      </Container>
    );
  }
}
