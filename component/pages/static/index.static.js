import React from "react";
import {
  Menu,
  Sticky,
  Segment,
  Container,
  Grid,
  Header,
  Image,
  List,
  Divider
} from "semantic-ui-react";

export const Navbar = () => {
  return (
    <div>
      <Sticky>
        <Menu inverted>
          <Container>
            <Menu.Item as="a" header>
              <Image
                size="mini"
                src="https://cdn.worldvectorlogo.com/logos/react.svg"
                style={{ marginRight: "1.5em" }}
              />
              WESPORTS
            </Menu.Item>
            <Menu.Item as="a" position="right">
              Sign In
            </Menu.Item>
          </Container>
        </Menu>
      </Sticky>
    </div>
  );
};

export const Footer = () => {
  return (
    <div>
      <Segment
        inverted
        vertical
        style={{ margin: "5em 0em 0em", padding: "5em 0em", bottom: 0 }}
      >
        <Container textAlign="center">
          <Grid divided inverted stackable>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Group 1" />
              <List link inverted>
                <List.Item as="a">Link One</List.Item>
                <List.Item as="a">Link Two</List.Item>
                <List.Item as="a">Link Three</List.Item>
                <List.Item as="a">Link Four</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Group 2" />
              <List link inverted>
                <List.Item as="a">Link One</List.Item>
                <List.Item as="a">Link Two</List.Item>
                <List.Item as="a">Link Three</List.Item>
                <List.Item as="a">Link Four</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={3}>
              <Header inverted as="h4" content="Group 3" />
              <List link inverted>
                <List.Item as="a">Link One</List.Item>
                <List.Item as="a">Link Two</List.Item>
                <List.Item as="a">Link Three</List.Item>
                <List.Item as="a">Link Four</List.Item>
              </List>
            </Grid.Column>
            <Grid.Column width={7}>
              <Header inverted as="h4" content="Footer Header" />
              <p>
                Extra space for a call to action inside the footer that could
                help re-engage users.
              </p>
            </Grid.Column>
          </Grid>
          <Divider inverted section />
          <Image centered size="mini" src="https://cdn.worldvectorlogo.com/logos/react.svg" />
          <List horizontal inverted divided link size="small">
            <List.Item as="a" href="#">
              Site Map
            </List.Item>
            <List.Item as="a" href="#">
              Contact Us
            </List.Item>
            <List.Item as="a" href="#">
              Terms and Conditions
            </List.Item>
            <List.Item as="a" href="#">
              Privacy Policy
            </List.Item>
          </List>
        </Container>
      </Segment>
    </div>
  );
};
