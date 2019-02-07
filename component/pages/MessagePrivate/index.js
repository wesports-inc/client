import React, { Component } from "react";
import { Container, Grid, Divider, Image, List, Header, Statistic, Label, TextArea, Button, Input } from "semantic-ui-react";
import Skeleton from "react-skeleton-loader";
import HeaderMessagePrivate from "./HeaderMessagePrivate";
import axios from "axios";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("email").slice(1, -1),
      datas: [],
      username_user1 : window.location.href.split('=')[1],
      username_user2: "",
      isLogin: "",
      pesan: "",
      data_message: "",
      isLoading: true,
      kode: 0
    };
    this.generateSkeleton = this.generateSkeleton.bind(this);
    this.generateZeroData = this.generateZeroData.bind(this);
    this.handlePost = this.handlePost.bind(this);
  }

  componentWillMount() {
    axios({
      method: "post",
      url: "/api/detail/message",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email,
        username_user1: this.state.username_user1
      }
    }).then(result => this.setState({ datas: result.data }));
    this.setState({
      isLogin: localStorage.getItem("auth")
    });
  }

  componentDidMount() {
  }

  shouldComponentUpdate(newProps, newState) {
    if (newState) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.kode == 1) {
      axios({
        method: "post",
        url: "/api/detail/message",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        data: {
          email: this.state.email,
          username_user1: this.state.username_user1
        }
      }).then(result => this.setState({ datas: result.data, kode: 0,pesan:"" }));
    }
  }

  handlePost(event) {
    let target = event.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value
    })
    console.log(this.state.pesan)
  }

  message() {
    axios({
      method: "post",
      url: "/api/send/message",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email,
        username_user2: this.state.username_user1,
        message: this.state.pesan
      }
    }).then( () => this.setState({kode: 1}) );
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
              <Grid columns={1} key={data._id}>
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
          <Header.Content>
            <Statistic>
              <Statistic.Value text>Hell Yeah,</Statistic.Value>
              <Statistic.Label>
                <i>No Message</i>
              </Statistic.Label>
              <Statistic.Label></Statistic.Label>
            </Statistic>
          </Header.Content>
        </Header>
      </div>
    );
  }

  render() {
    const { datas } = this.state;
    return (
      <div style={{ marginBottom: 45 }}>
        <HeaderMessagePrivate />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        {datas.length === 0 ? (
          this.generateZeroData()
        ) : (
          <Container>
            <Divider hidden />
              <Header as="h4" textAlign="center">{this.state.username_user1}</Header>
            <Divider />
            {datas.map(data => {
              console.log(data)
              return (
                <Grid columns={1} key={data._id}>
                  <Grid.Column>
                    <List verticalAlign="middle">
                      {data.username_user1 === this.state.username_user1 ?
                      <List.Item style={{float: "left"}}>
                        <List.Content>
                          <List.Header><Label size="small" style={{ backgroundColor: "transparent"}}><b><Image avatar src="https://react.semantic-ui.com/images/avatar/small/tom.jpg" />{data.name_user1}</b></Label></List.Header>
                          <Label size="large" className="ui black label" pointing="left">
                            {data.message}
                          </Label><Label size="small" style={{ backgroundColor: "transparent"}}>{data.status}{" "}{data.date}</Label>
                        </List.Content>
                      </List.Item>
                      : 
                      <List.Item style={{float: "right"}}>
                        <List.Content style={{float: "right"}}>
                        <Label size="small" style={{ backgroundColor: "transparent"}}>{data.date}</Label><Label size="large" className="ui grey label" pointing="right">
                            {data.message}
                          </Label>
                        </List.Content>
                      </List.Item>}
                    </List>
                  </Grid.Column>
                </Grid>
              );
            })}
            
          </Container>
        )}
        <TextArea value={this.state.pesan} style={{ width:"90%",zIndex: 2,position: "fixed",bottom: 0 }} name="pesan" onChange={this.handlePost} placeholder='Ketik Pesan...' />
        <Input name="focus" hidden style={{ width:"90%",zIndex: -2,position: "fixed",bottom: 0 }}/>
        <Button onClick={this.message.bind(this)} style={{ backgroundColor: "transparent",zIndex: 2,position: "fixed",bottom: 0,right: -0 }}  icon="paper plane outline"></Button>
      </div>
    );
  }
}
