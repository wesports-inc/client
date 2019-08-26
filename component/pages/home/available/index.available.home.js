import React from "react";
import { Container, Grid, Divider } from "semantic-ui-react";
import AvailablePlayer from "./player/index.player";
import AvailableTeam from "./team/index.team";

const Available = () => {
  return (
    <Container>
      <Grid>
        <Grid.Column width={4}>
          <h3>Available Solo Player</h3>
          <Divider />
          <AvailablePlayer />
        </Grid.Column>
        <Grid.Column width={4}>
          <h3>More Slot On This Team</h3>
          <Divider />
          <AvailableTeam />
        </Grid.Column>
        <Grid.Column width={4}>
          <h3>Available Tournament</h3>
          <Divider />a list of tournament
        </Grid.Column>
        <Grid.Column width={4}>
          <h3>Available Games</h3>
          <Divider />a list of games
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Available;
