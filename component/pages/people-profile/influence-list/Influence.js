import React, { Component } from "react";
import axios from "axios";
import { Header, Statistic, Container, Grid, List, Image, Label, Divider } from "semantic-ui-react";

export default class Influence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email_friend: sessionStorage.getItem("email_friend"),
      datas: []
    };
    this.generateZeroData = this.generateZeroData.bind(this);
  }

  componentWillMount() {
    axios({
      method: "post",
      url: "/api/follower/list",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email_friend // This is the body part
      }
    }).then(result => this.setState({ datas: result.data }));
  }

  generateZeroData() {
    return (
      <div>
        <Container>
          <Header as="h2" icon textAlign="center">
            <Divider hidden />
            <Header.Content>
              <Statistic>
                <Statistic.Value text>OMG,</Statistic.Value>
                <Image
                  centered
                  size="large"
                  src="https://image.spreadshirtmedia.com/image-server/v1/mp/designs/12346806,width=178,height=178/cute-devil.png"
                />
                <Divider hidden />
                <Statistic.Label>
                  <i>No One influenced</i>
                </Statistic.Label>
              </Statistic>
            </Header.Content>
          </Header>
        </Container>
      </div>
    );
  }

  componentDidUpdate() {}
  render() {
    const { datas } = this.state;
    return datas.length != 0 ? (
      <div>
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
                  <Label style={{ width: "100px", float: "right", textAlign: "center" }} color="red" size="small">
                    Influenced
                  </Label>
                </Grid.Column>
              </Grid>
            );
          })}
        </Container>
      </div>
    ) : (
      this.generateZeroData()
    );
  }
}
