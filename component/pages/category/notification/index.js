import React, { Component } from "react";
import { Container, Grid, Divider, Image, List, Header, Label, Statistic } from "semantic-ui-react";
import Skeleton from "react-skeleton-loader";
import HeaderNotification from "./HeaderNotification";
import MenuProfile from "../../profile/MenuProfile";
import axios from "axios";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("email").slice(1, -1),
      datas: [],
      isLogin: "",
      isLoading: true
    };
    this.generateSkeleton = this.generateSkeleton.bind(this);
    this.generateZeroData = this.generateZeroData.bind(this);
  }

  componentWillMount() {
    axios({
      method: "post",
      url: "/api/follow/notif",
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
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 500);
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
              <Statistic.Label>Notification</Statistic.Label>
            </Statistic>
          </Header.Content>
        </Header>
      </div>
    );
  }

  render() {
    const { datas } = this.state;
    const { isLoading } = this.state;
    return (
      <div style={{ marginBottom: 45 }}>
        <HeaderNotification />
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
                    <List verticalAlign="middle">
                      <List.Item>
                        <Image avatar src="https://react.semantic-ui.com/images/avatar/small/tom.jpg" />
                        <List.Content>
                          <List.Header>{data.username}</List.Header>
                          <p>{data.name}</p>
                        </List.Content>
                      </List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column verticalAlign="middle">
                    <Label style={{ width: "100px", float: "right", textAlign: "center" }} size="small">
                      followed you
                    </Label>
                  </Grid.Column>
                </Grid>
              );
            })}
          </Container>
        )}
        <MenuProfile />
      </div>
    );
  }
}
