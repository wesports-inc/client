import React, { Component } from "react";
import { Image, Container, Divider, Grid, GridColumn, Segment, Dimmer, Header, Icon } from "semantic-ui-react";
import Skeleton from "react-skeleton-loader";

export default class MoreCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCategory: "",
      isLoading: true,
      dimmers: false
    };
    this.handleMenu = this.handleMenu.bind(this);
    this.generateSkeleton = this.generateSkeleton.bind(this);
    this.OpenDimmer = this.OpenDimmer.bind(this)
  }

  componentWillMount() {
    console.log('data: ', localStorage.getItem('email'))
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 500);
  }

  handleMenu(category) {
    this.setState({
      isCategory: category
    });
  }

  OpenDimmer() {
    return (
    <Dimmer active page onClickOutside={() => this.setState({ dimmers: false })}>
                <Header as="h2" icon inverted>
                  <Icon name="studiovinari" />
                  MASTERPIECE
                </Header>
              </Dimmer>
    )
  }

  generateSkeleton() {
    return (
      <div>
        <Container>
          <Divider hidden />
          <Grid columns={4}>
            <GridColumn>
              <p>
                <Skeleton height="30px" width="30px" />
              </p>
            </GridColumn>
            <GridColumn>
              <p>
                <Skeleton height="30px" width="30px" />
              </p>
            </GridColumn>
            <GridColumn>
              <p>
                <Skeleton height="30px" width="30px" />
              </p>
            </GridColumn>
            <GridColumn>
              <p>
                <Skeleton height="30px" width="30px" />
              </p>
            </GridColumn>
          </Grid>
        </Container>
      </div>
    );
  }

  noSpacing = {
    textAlign: "center",
    margin: 0,
    padding: 0
  };

  smallFontCenter = {
    fontSize: 10,
    textAlign: "center"
  };

  render() {
    /*
    const settingIcon= 'http://192.168.1.14/assets/icons/more-categories/setting.png';
    const peopleIcon= 'http://192.168.1.14/assets/icons/more-categories/people.png';
    const photoIcon= 'http://192.168.1.14/assets/icons/more-categories/photo.png';
    const statisticIcon= 'http://192.168.1.14/assets/icons/more-categories/statistic.png';
    */

    const settingIcon = "../../../../assets/images/icon/setting.png";
    const peopleIcon = "../../../../assets/images/icon/group.png";
    const photoIcon = "../../../../assets/images/icon/reputation.png";
    const statisticIcon = "../../../../assets/images/icon/statistic.png";
    const coloring = {
      color: "#555"
    };
    const { isLoading } = this.state;
    // bypass logout user
    if (this.state.isCategory === "setting") {
      window.location = "#/setting";
    } else if (this.state.isCategory === "people") {
      window.location = "#/people";
    } else if (this.state.isCategory === "reputation") {
      return null;
    } else if (this.state.isCategory === "statistic") {
      window.location = "#/statistic";
    }
    return (
      <div style={{ marginBottom: 10 }}>
        {isLoading ? (
          this.generateSkeleton()
        ) : (
          <Container>
            {this.state.dimmers ? (
              this.OpenDimmer()
            ) : null}
            <Divider hidden />
            <Segment>
              <Grid columns={4} style={coloring}>
                <GridColumn>
                  <p style={this.noSpacing} onClick={() => this.handleMenu("statistic")}>
                    <Image src={statisticIcon} avatar />
                  </p>
                  <p style={this.smallFontCenter}>Statistic</p>
                </GridColumn>
                <GridColumn>
                  <p style={this.noSpacing} onClick={() => this.setState({ dimmers: true })}>
                    <Image src={photoIcon} avatar />
                  </p>
                  <p style={this.smallFontCenter}>Reputation</p>
                </GridColumn>
                <GridColumn>
                  <p style={this.noSpacing} onClick={() => this.handleMenu("people")}>
                    <Image src={peopleIcon} avatar />
                  </p>
                  <p style={this.smallFontCenter}>People</p>
                </GridColumn>
                <GridColumn>
                  <p style={this.noSpacing} onClick={() => this.handleMenu("setting")}>
                    <Image src={settingIcon} avatar />
                  </p>
                  <p style={this.smallFontCenter}>Setting</p>
                </GridColumn>
              </Grid>
            </Segment>
            <Divider />
          </Container>
        )}
      </div>
    );
  }
}
