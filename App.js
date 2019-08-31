import React, { Component } from "react";
import { Navbar } from "./component/pages/static/index.static";
import { NewTeam } from "./component/pages/team/new.team";
import { FeaturedTeam } from "./component/pages/team/featured.team";
import { NewPlayer } from "./component/pages/player/new.player";
import { MonthlyTournament } from "./component/pages/tournament/monthly.tournament";
import { Divider } from "semantic-ui-react";
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Navbar />
        <NewTeam />
        <NewPlayer />
        <FeaturedTeam />
        <MonthlyTournament />
        <Divider hidden />
        <Divider hidden />
      </div>
    );
  }
}
