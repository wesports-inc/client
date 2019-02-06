import React, { Component } from "react";
import HeaderProfile from "./HeaderProfile";
import HeaderPeople from "./HeaderPeople";
import Action from "./Action";
import Posts from "./Posts";
import { Container, Grid, Divider, Image, List, Header, Button, Modal } from "semantic-ui-react";
import axios from "axios";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: "",
      email: "",
      username: sessionStorage.getItem("username"),
      datas: [],
      email_friend: ""
    };
  }

  componentWillMount() {
    axios({
      method: "post",
      url: "/api/follow/user/data",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        username: this.state.username // This is the body part
      }
    }).then(result => this.setState({ datas: result.data[0], email_friend: result.data[0].email }));

    const email = JSON.parse(localStorage.getItem("email"));
    const auth = JSON.parse(localStorage.getItem("auth"));
    this.setState({
      email,
      isLogin: auth
    });
  }

  componentDidMount() {
    if (this.state.isLogin != true) {
      window.location = "#/login";
    }
  }

  shouldComponentUpdate(newProps, newState) {
    if (newState.isLogin) {
      return true;
    } else {
      return false;
    }
  }

  componentWillUpdate(nextProps, nextState) {
    nextState.isLogin === "false" ? (window.location = "#/login") : "";
  }

  componentDidUpdate(prevProps, prevState) {}

  render() {
    sessionStorage.setItem("email_friend", this.state.email_friend);
    return (
      <div style={{ marginBottom: 45 }}>
        <HeaderPeople />
        <Divider hidden />
        <Divider hidden />
        <Divider hidden />
        <HeaderProfile />
        <Action />
        <Posts />
      </div>
    );
  }
}
