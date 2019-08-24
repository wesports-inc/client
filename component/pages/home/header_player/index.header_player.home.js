import React from "react";
import { Container, Grid, Divider } from "semantic-ui-react";
import AvailablePlayer from "./subheader_player/available.subheader_player";

const HeaderPlayer = () => {
  return (
    <Container style={{ marginTop: 40 }}>
      <Grid centered>
        <Grid.Column width={6}>
          <h3>Available Solo Player</h3>
          <Divider />
          <AvailablePlayer />
        </Grid.Column>
        <Grid.Column width={6}>
          <h3>More Slot On This Team</h3>
          <Divider />
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default HeaderPlayer;
