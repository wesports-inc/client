import React from "react";
import { Container, Grid, Image, Divider } from "semantic-ui-react";
import Activity from "./subheader/activity.subheader";
import Tournament from "./subheader/tournament.subheader";

//STATUS adalah semacam notification aktifitas di home feed

//status 1 = PLAYER JOINING TEAM
//status 2 = TEAM INVITING A PLAYER
//status 3 = MEMBUAT TEAM
//status 4 = KELUAR DARI TEAM

const Headers = () => {
  return (
    <Container style={{ marginTop: '7em' }}>
      <Grid>
        <Grid.Column width={4}>
          <h3>Top 5 Team This Week</h3>
          <Divider />
          <Image src="/assets/images/background/bg-profile.jpg" />
        </Grid.Column>
        <Grid.Column width={9}>
          <h3>Today Activity</h3>
          <Divider />
          <Activity
            status={1}
            time="a minutes ago"
            users="tedi surya"
            team="EVOS GG"
            image={"https://img.icons8.com/bubbles/2x/user.png"}
            summary="Teday joined to EVOS TEAM as support role on Mobile Legends"
          />
          <Activity
            status={1}
            time="5 minutes ago"
            users="hafidh ghifar"
            team="PSG RRQ"
            image={"https://img.icons8.com/plasticine/2x/user.png"}
            summary="Teday joined to EVOS TEAM as support role on Mobile Legends"
          />
          <Activity
            status={4}
            time="9 minutes ago"
            users="nur cahyo"
            team="BOOM ID"
            image={"https://img.icons8.com/dusk/2x/user.png"}
            summary="nur cahyo get Fired from BOOM ID :("
          />
        </Grid.Column>
        <Grid.Column width={3}>
          <h3>Wall Info</h3>
          <Divider />
          <Tournament />
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default Headers;
