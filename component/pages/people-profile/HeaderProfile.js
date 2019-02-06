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
    this.gotoInfluenceList = this.gotoInfluenceList.bind(this);
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

  gotoInfluenceList() {
    window.location = "#/user/influence/list";
  }

  render() {
    const { profile, status, temp_total } = this.state;
    var ranking = this.state.rank ;
    //simple css styling
    const smallFont = {
      fontSize: 10
    };
    const toRight = {
      float: "right"
    };
    return (
      <div style={{ marginBottom: 15, background: "#f5f5f5" }}>
        <Container>
          {profile.map(data => {
            return (
              <Grid columns={2} key={data._id}>
                <Grid.Row stretched>
                  <Grid.Column>
                    <Segment textAlign="center">
                      <Image
                        src={"http://localhost:3000/src/web-api/public/avatar/" + data.foto}
                        size="medium"
                        circular
                        bordered
                      />
                      <br />@{data.username}
                      <br />
                      {data.first_name} {data.last_name}
                      <Divider />
                      {status === "followed" ? (
                        <Button
                          content="unfollow"
                          size="tiny"
                          primary
                          fluid
                          onClick={() => this.handleUnfollow(data.email)}
                        />
                      ) : (
                        <Button
                          content="follow"
                          size="tiny"
                          primary
                          fluid
                          onClick={() => this.handleFollow(data.email)}
                        />
                      )}
                    </Segment>
                  </Grid.Column>
                  <Grid.Column>
                    <Segment textAlign="center">
                      <Statistic color="yellow">
                        <Statistic.Label>User Rank</Statistic.Label>
                        <Statistic.Value>{ranking}</Statistic.Value>
                      </Statistic>
                    </Segment>
                    <Segment>
                      <p style={smallFont}>
                        Posts <span style={toRight}>{data.total_posts}</span>
                      </p>
                      <p style={smallFont}>
                        Influencing{" "}
                        <a onClick={this.gotoInfluenceList} style={toRight}>
                          <u style={{ color: "blue" }}>{temp_total} person</u>
                        </a>
                      </p>
                      <p style={smallFont}>
                        Awards{" "}
                        <span style={toRight}>
                          <u style={{ color: "blue" }}>{data.awards}</u>
                        </span>
                      </p>
                      <p style={smallFont}>
                        Tags{" "}
                        <span style={toRight}>
                          <u style={{ color: "blue" }}>{data.tags}</u>
                        </span>
                      </p>
                      <p style={smallFont}>
                        Join Date{" "}
                        <span style={toRight}>
                          <i>{data.join_date}</i>
                        </span>
                      </p>
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
