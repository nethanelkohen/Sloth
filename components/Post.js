import React, { Component } from "react";
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
  Body
} from "native-base";
import fetchData from "../utils/fetchData";
import RenderPost from "../functional/RenderPost";

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
      <Container>
        <Header>
          <Text>What's going on?</Text>
        </Header>
        <Content>
          <Form>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                placeholder="Which station would you like to update?"
                placeholderStyle={{ color: "#bfc6ea" }}
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
                placeholderStyle={{ color: "#bfc6ea" }}
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
                placeholderStyle={{ color: "#bfc6ea" }}
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
                value={comments}
                onChangeText={comments => this.setState({ comments })}
              />
            </Item>
            <Body>
              <Button
                onPress={() =>
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
                  )
                }
                style={{ marginTop: 20 }}
              >
                <Text>Update!</Text>
              </Button>
            </Body>
          </Form>
          <RenderPost props={updateConfirm} />
        </Content>
      </Container>
    );
  }
}
