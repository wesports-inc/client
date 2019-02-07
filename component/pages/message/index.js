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
      username_user1: "",
      username_user2: "",
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
    
    axios({
      method: "post",
      url: "/api/profile",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email // This is the body part
      }
    }).then(result => this.setState({ username_user1: result.data.username}));
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

  message(Value) {
    event.preventDefault();
    window.location = "#/dm?username=" + Value
  }

  newmessage() {
    event.preventDefault();
    window.location = "#/newdm"
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
                <Grid columns={2} key={data}>
                {data === this.state.username_user1 ? null :  
                  <Grid.Column>
                    <List verticalAlign="middle" onClick={() => {this.message(data)}}>
                      <List.Item>
                        <Image avatar src="https://react.semantic-ui.com/images/avatar/small/tom.jpg" />
                        <List.Content>
                          <List.Header>{data}</List.Header>
                        </List.Content>
                      </List.Item>
                    </List>
                  </Grid.Column>
                }
                </Grid>
              );
            })}
          </Container>
        )}
        <Button style={{float: "right",zIndex: 2,position: "fixed",bottom: 50,right: -0 }} onClick={() => {this.newmessage()}}>+</Button>
        <MenuProfile />
      </div>
    );
  }
}
