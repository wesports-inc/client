import React, { Component } from "react";
import {
  Button,
  Form,
  Container,
  Grid,
  Divider,
  Header,
  Icon,
  Segment,
  Message
} from "semantic-ui-react";
import axios from "axios";

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isLogin: false,
      token: "",
      warning: null
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // eslint-disable-next-line react/no-deprecated
  componentWillMount() {
    this.setState(
      {
        isLogin: localStorage.getItem("auth")
      },
      () => console.log("di dalam state islogin: ", this.state.isLogin)
    );
  }

  componentDidMount() {
    const { isLogin } = this.state;
    isLogin === "true"
      ? (window.location = "#/profile")
      : console.log("ternyata tidak true");
  }

  shouldComponentUpdate(newProps, newState) {
    if (newState.isLogin || newState.warning) {
      return true;
    } else {
      return false;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { isLogin } = this.state;
    if (isLogin == true) {
      localStorage.setItem("email", JSON.stringify(this.state.email));
      localStorage.setItem("auth", JSON.stringify(this.state.isLogin));
      window.location = "#/profile";
    }
  }

  handleChange(event) {
    let target = event.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios({
      method: "POST",
      url: "/api/login",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        email: this.state.email,
        password: this.state.password
      }
    }).then(result =>
      this.setState({
        warning: result.data,
        isLogin: result.data.auth,
        token: result.data.token
      })
    );
  }

  render() {
    const { warning } = this.state;
    const areaRegisterButtonResponsive = {
      padding: "1%"
    };
    return (
      <div>
        <Container>
          <Divider hidden />
          {warning == 1 ? (
            <Message negative>
              <center>Email/Password is Wrong !</center>
            </Message>
          ) : null}
          <Grid
            textAlign="center"
            style={{ height: "100%" }}
            columns={1}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Divider hidden />
              <Divider hidden />
              <Header as="h3">
                <Icon name="user circle" size="large" />
                Login Account
              </Header>
              <Form size="large" onSubmit={this.handleSubmit}>
                <Segment stacked>
                  <Form.Input
                    fluid
                    icon="user"
                    iconPosition="left"
                    placeholder="E-Mail Address"
                    name="email"
                    type="email"
                    onChange={this.handleChange}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    name="password"
                    onChange={this.handleChange}
                  />
                  <Button color="blue" fluid size="large">
                    Log In
                  </Button>
                </Segment>
              </Form>
            </Grid.Column>
            <Grid.Column
              verticalAlign="middle"
              style={areaRegisterButtonResponsive}
            >
              <Button
                content="Sign in with Google"
                color="google plus"
                icon="google"
                size="mini"
              />
              <Button
                content="Sign in with Facebook"
                icon="facebook"
                color="facebook"
                size="mini"
              />
            </Grid.Column>
          </Grid>
          <Divider />
          <Message>
            New to Sleeperbox ? <a href="#/register">Sign Up Here ! </a>
          </Message>
        </Container>
      </div>
    );
  }
}
