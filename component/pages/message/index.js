import React, { Component } from "react";
import { Container, Grid, Divider, Image, List, Header, Statistic, Button, Modal } from "semantic-ui-react";
import Skeleton from "react-skeleton-loader";
import HeaderMessage from "./HeaderMessage";
import MenuProfile from "../profile/MenuProfile";
import axios from "axios";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("email").slice(1, -1),
      datas: [],
      username_send: "",
      username_received: "",
      isLogin: "",
      data_message: "",
      isLoading: true
    };
    this.generateSkeleton = this.generateSkeleton.bind(this);
    this.generateZeroData = this.generateZeroData.bind(this);
  }

  componentWillMount() {
    axios({
      method: "post",
      url: "/api/list/message",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email // This is the body part
      }
    }).then(result => this.setState({ datas: result.data }));
    this.setState({
      isLogin: localStorage.getItem("auth")
    });
  }

  componentDidMount() {
    if (this.state.datas) {
        this.setState({ isLoading: false });
    }
    const { isLogin } = this.state;
    isLogin === "false" ? (window.location = "#/login") : "";
  }

  componentDidUpdate(prevProps, prevState) {
    const { isLogin } = this.state;
    if (isLogin === false) {
      window.location = "#/login";
    }
  }

  message(send,received) {
    event.preventDefault();
    localStorage.setItem("username_received", this.state.username_received);
    this.setState({username_send : send, username_received : received})
    window.location = "#/dm?username=" + send
  }

  generateSkeleton() {
    const { datas } = this.state;
    return (
      <div style={{ marginBottom: 45 }}>
        <Container>
          <Divider hidden />
          <Skeleton width="100%">
            <Header as="h2" textAlign="center" />
          </Skeleton>
          <Divider />
          {datas.map(data => {
            return (
              <Grid columns={2} key={data._id}>
                <Grid.Column>
                  <List verticalAlign="middle">
                    <List.Item>
                      <List.Content>
                        <List.Header>
                          <Skeleton />
                        </List.Header>
                        <p>
                          <Skeleton />
                        </p>
                      </List.Content>
                    </List.Item>
                  </List>
                </Grid.Column>

                <Grid.Column verticalAlign="middle">
                  <Skeleton />
                </Grid.Column>
              </Grid>
            );
          })}
        </Container>
      </div>
    );
  }

  generateZeroData() {
    const divConten = {
      marginTop: "40%",
      marginBottom: "60%"
    };
    return (
      <div style={divConten}>
        <Header as="h2" icon textAlign="center">
          <Image
            centered
            size="large"
            src="https://image.spreadshirtmedia.com/image-server/v1/mp/designs/12346806,width=178,height=178/cute-devil.png"
          />
          <Header.Content>
            <Statistic>
              <Statistic.Value text>Hell Yeah,</Statistic.Value>
              <Statistic.Label>
                <i>0 Million</i>
              </Statistic.Label>
              <Statistic.Label>Message</Statistic.Label>
            </Statistic>
          </Header.Content>
        </Header>
      </div>
    );
  }

  render() {
    const { datas, isLoading } = this.state;
    return (
      <div style={{ marginBottom: 45 }}>
        <HeaderMessage />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        {datas.length === 0 ? (
          this.generateZeroData()
        ) : isLoading ? (
          this.generateSkeleton()
        ) : (
          <Container>
            {datas.map(data => {
              return (
                <Grid columns={2} key={data._id}>
                  <Grid.Column>
                    <List verticalAlign="middle" onClick={() => {this.message(data.username_send, data.username_received)}}>
                      <List.Item>
                        <Image avatar src="https://react.semantic-ui.com/images/avatar/small/tom.jpg" />
                        <List.Content>
                          <List.Header>{data.name_send}</List.Header>
                          <i>{data.message}</i>
                        </List.Content>
                      </List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column verticalAlign="middle">
                  </Grid.Column>
                </Grid>
              );
            })}
          </Container>
        )}
        <Button style={{float: "right"}}>+</Button>
        <MenuProfile />
      </div>
    );
  }
}
