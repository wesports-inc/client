import React, { Component } from 'react';
import './app.css';
import ReactImage from './react.png';

export default class App extends Component {
  // state = { username: null };

  /*
  componentDidMount() {
    fetch('/api/getUsername')
      .then(res => res.json())
      .then(user => this.setState({ username: user.username }));
  }
  */

  render() {
    const fuse = this.state;
    console.log(fuse);
    return (
      <div>
        <img src={ReactImage} alt="react" />
      </div>
    );
  }
}
