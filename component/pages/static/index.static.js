import React, { useState } from "react";
import { Menu, Sidebar, Icon, Input, Segment, Select, Button, Sticky, Container } from "semantic-ui-react";
import "./index.static.css";

export const Navbar = () => {
  const [visible, setVisible] = useState(false);

  const handleSideBar = () => {
    setVisible(!visible);
  };

  const options = [
    { key: "all", text: "All", value: "all" },
    { key: "player", text: "Player", value: "player" },
    { key: "team", text: "Team", value: "team" }
  ];

  return (
    <div>
      <Sidebar
        as={Menu}
        icon="labeled"
        vertical
        direction="bottom"
        className="container"
        visible={visible}
        animation="overlay"
        className="sidebar-menu"
      >
        <Menu size="large" className="popup-nav">
          <Menu.Item as="a" position="left" className="menu-center">
            <Icon name="arrow alternate circle left outline" />
            Back
          </Menu.Item>
          <Menu.Item as="a" position="right" className="menu-center">
            <Icon name="ticket alternate" />
            Games Event
          </Menu.Item>
          <Menu.Item as="a" className="menu-center">
            <Icon name="sitemap" />
            Leaderboard
          </Menu.Item>
          <Menu.Item as="a" className="menu-center">
            <Icon name="user circle outline" />
            Sign In
          </Menu.Item>
        </Menu>
      </Sidebar>
      <Sidebar.Pusher>
        <Segment className="landing" inverted>
          <div className="transbg">
            <Container>
              <Menu inverted secondary size="large">
                <Menu.Item as="a" position="left">
                  <Input size="mini" type="text" placeholder="Search..." action>
                    <input />
                    <Select options={options} compact defaultValue="player" />
                    <Button type="submit" size="small">
                      <Icon name="search" />
                    </Button>
                  </Input>
                </Menu.Item>
                <Menu.Item as="a" onClick={handleSideBar} position="right">
                  <Icon name="bars" size="large" color="grey" style={{ marginLeft: -20 }} />
                </Menu.Item>
              </Menu>
            </Container>
          </div>
        </Segment>
      </Sidebar.Pusher>
    </div>
  );
};
