import React, { Component } from "react";
import { Container, Grid, Divider, Image, Segment, Statistic, Button, Label, Icon } from "semantic-ui-react";
import axios from "axios";

export default class HeaderProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("email").slice(1, -1),
      username: sessionStorage.getItem("username"),
      status: "",
      profile: [],
      rank: null,
      temp_total: null
    };
  }

  componentWillMount() {
    axios({
      method: "post",
      url: "/api/people/profile/get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        username: this.state.username // This is the body part
      }
    }).then(result =>
      this.setState({ profile: result.data, temp_total: result.data[0].total_friends }, () => {
        let stat = {
          email: this.state.email,
          email_friend: this.state.profile[0].email
        };
        axios({
          method: "post",
          url: "/api/follow/status",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          data: stat
        }).then(result => this.setState({ status: result.data }));
      })
    );
    
    
    axios({
      method: "post",
      url: "/api/people/profile/get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        username: this.state.username // This is the body part
      }
    }).then(result =>
      this.setState({ profile: result.data, temp_total: result.data[0].total_friends }, () => {
        let stat = {
          email: this.state.profile[0].email
        };
        axios({
          method: "post",
          url: "/api/user/rank",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          data: stat
        }).then(result => this.setState( {rank : result.data[0].rank+1}));
      })
    );
  }

  shouldComponentUpdate(newProps, newState) {
    if (newState) {
      return true;
    } else {
      return false;
    }
  }

  componentWillUpdate(nextProps, nextState) {}

  componentDidUpdate(prevProps, prevState) {}

  handleFollow(value) {
    let add = {
      email: this.state.email,
      email_friend: value
    };
    axios({
      method: "post",
      url: "/api/follow",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: add
    }).then(result => this.setState({ status: result.data.status, temp_total: this.state.temp_total + 1 }));
  }

  handleUnfollow(value) {
    let unfoll = {
      email: this.state.email,
      email_friend: value
    };
    axios({
      method: "put",
      url: "/api/unfollow",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: unfoll
    }).then(result => this.setState({ status: result.data.status, temp_total: this.state.temp_total - 1 }));
  }

  render() {
    const {profile} = this.state
    return (
      <div style={{ marginBottom: 15 }}>
        <Container>
          {profile.map(data => {
            return (
              <Grid columns={1} key={data._id}>
                <Grid.Row style={{background: 'linear-gradient(to bottom, #f7f8f9, #889998)'}}>
                  <Grid.Column>
                    <Segment basic textAlign="center">
                      <Image
                        src={"http://localhost:3000/src/web-api/public/avatar/" + data.foto}
                        size="medium"
                        circular
                        centered
                        bordered
                        style={{height: "150px", width: "150px" }} />
                      <br />@{data.username}
                      <br />
                      {data.first_name} {data.last_name}
                      <Divider hidden/>
                      {status === "followed" ? (
                        <Button
                          content="unfollow"
                          size="tiny"
                          fluid
                          style={{background: "#6497c0", fontSize: "14px", color: "white"}}
                          onClick={() => this.handleUnfollow(data.email)}
                        />
                      ) : (
                        <Button
                          content="follow"
                          size="tiny"
                          style={{background: "#6497c9", fontSize: "14px", color: "white"}}
                          fluid
                          onClick={() => this.handleFollow(data.email)}
                        />
                      )}
                    </Segment>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            );
          })}
        </Container>
      </div>
    );
  }
}
