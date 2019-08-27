import PropTypes from "prop-types";
import React, { Component } from "react";
import {
  Grid,
  Header,
  Image,
  Menu,
  Segment,
  Sidebar,
  Container
} from "semantic-ui-react";

const HorizontalSidebar = ({ animation, direction, visible }) => (
  <Sidebar
    as={Segment}
    animation={animation}
    direction={direction}
    visible={visible}
  >
    <Grid textAlign="center">
      <Grid.Row columns={1}>
        <Grid.Column>
          <Header as="h3">New Content Awaits</Header>
        </Grid.Column>
      </Grid.Row>
      <Grid columns={3} divided>
        <Grid.Column>
          <Image src="/images/wireframe/media-paragraph.png" />
        </Grid.Column>
        <Grid.Column>
          <Image src="/images/wireframe/media-paragraph.png" />
        </Grid.Column>
        <Grid.Column>
          <Image src="/images/wireframe/media-paragraph.png" />
        </Grid.Column>
      </Grid>
    </Grid>
  </Sidebar>
);

HorizontalSidebar.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool
};

const VerticalSidebar = ({ animation, direction, visible }) => (
  <Sidebar
    as={Menu}
    animation={animation}
    direction={direction}
    icon="labeled"
    inverted
    vertical
    visible={visible}
    width="thin"
  >
    <Menu.Item as="a">
      Home
    </Menu.Item>
    <Menu.Item as="a">
      Games
    </Menu.Item>
    <Menu.Item as="a">
      Channels
    </Menu.Item>
  </Sidebar>
);

VerticalSidebar.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool
};

export default class Index extends Component {
  state = {
    animation: "overlay",
    direction: "left",
    dimmed: false,
    visible: false
  };

  handleAnimationChange = animation => () =>
    this.setState(prevState => ({ animation, visible: !prevState.visible }));

  render() {
    const { animation, dimmed, direction, visible } = this.state;
    const vertical = direction === "bottom" || direction === "top";

    return (
      <div style={{ height: "100vh" }}>
        <Sidebar.Pushable>
          {vertical ? (
            <HorizontalSidebar
              animation={animation}
              direction={direction}
              visible={visible}
            />
          ) : null}
          {vertical ? null : (
            <VerticalSidebar
              animation={animation}
              direction={direction}
              visible={visible}
            />
          )}

          <Sidebar.Pusher dimmed={dimmed && visible}>
            <Segment basic style={{ backgroundColor: "#f7f7f7f7", height: "100vh" }}>
              <Menu inverted fixed="top">
                <Menu.Item as="a" header  onClick={this.handleAnimationChange("push")}>
                  <Image
                    size="mini"
                    src="https://www.malavasig.it/WP/wp-content/uploads/2017/09/mobile_menu.png"
                    style={{ marginRight: "1.5em" }}
                  />
                  WESPORTS
                </Menu.Item>
                <Menu.Item as="a" position="right">
                  Sign In
                </Menu.Item>
              </Menu>
              <div style={{marginTop: "4em"}}>
                <Header as="h3">Application Content</Header>
                <Image src="/images/wireframe/paragraph.png" />
              </div>
              
            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>
    );
  }
}
