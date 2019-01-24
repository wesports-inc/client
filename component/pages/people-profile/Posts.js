import React, { Component } from "react";
import {
  Grid,
  Container,
  Segment,
  Divider,
  Icon,
  GridColumn,
  List,
  Dimmer,
  Header,
  Image
} from "semantic-ui-react";
import Skeleton from "react-skeleton-loader";
import axios from "axios";

export default class MyPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      username: sessionStorage.getItem("username"),
      posting: [],
      tgl: new Date().toDateString(),
      day: new Date().getDay(),
      jam: new Date().getHours(),
      menit: new Date().getMinutes(),
      menitPosting: [],
      waktu: []
    };
    this.generateSkeleton = this.generateSkeleton.bind(this);
  }

  componentDidMount() {
    axios({
      method: "post",
      url: "/api/posting/people",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        username: this.state.username // This is the body part
      }
    }).then(result => this.setState({ posting: result.data, isLoading: false }));
  }

  generateSkeleton() {
    return (
      <div>
        <Container>
          <Grid>
            <GridColumn>
              <Segment basic>
                <List>
                  <List.Item>
                    <List.Content>
                      <List.Header as="a">
                        <Skeleton width="10px" height="10px" />
                      </List.Header>
                      <List.Description>
                        <Skeleton />
                        <a>
                          <b>
                            <Skeleton />
                          </b>
                        </a>{" "}
                        <small>
                          <i>
                            <Skeleton />
                          </i>
                        </small>
                        .
                      </List.Description>
                    </List.Content>
                  </List.Item>
                  <Divider clearing />
                  <List.Item>
                    <List.Content>
                      <List.Header as="a">
                        <Skeleton width="10px" height="10px" />
                      </List.Header>
                      <List.Description>
                        <Skeleton />
                        <a>
                          <b>
                            <Skeleton />
                          </b>
                        </a>{" "}
                        <small>
                          <i>
                            <Skeleton />
                          </i>
                        </small>
                        .
                      </List.Description>
                    </List.Content>
                  </List.Item>
                </List>
              </Segment>
            </GridColumn>
          </Grid>
        </Container>
      </div>
    );
  }

  render() {
    const { posting } = this.state;
    const nopost = posting.length;
    const { isLoading } = this.state;
    let a;
    const gridMargin = {
      marginBottom: "-70px"
    };
    const textMargin = {
      marginLeft: "2%"
    };
    return (
      <div>
        {isLoading ? (
          this.generateSkeleton()
        ) : nopost == 0 ? (
          <Container>
            <Divider hidden />
            <Header as="h2" icon textAlign="center">
              <Icon name="meh" />
              No Post
              <Header.Subheader>
                <i>This user has no post yet, comeback later</i>
              </Header.Subheader>
            </Header>
          </Container>
        ) : (
          <Container>
            {posting.map((data, index) => {
              return (
                <Grid columns={1} key={data._id}>
                  <GridColumn style={gridMargin}>
                    <Segment>
                      <List>
                        <List.Item>
                          <List.Content>
                            <List.Header as="a">
                              <small>
                                {data.tags === "null" ? (
                                  <Image
                                    src="http://192.168.1.14/assets/icons/tags/pilihkategori.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "computer-gadget" ? (
                                  <Image
                                    src="http://192.168.1.14/assets/icons/tags/komputergadget.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "family-love" ? (
                                  <Image
                                    src="http://192.168.1.14/assets/icons/tags/keluargaasmara.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "fact-rumour" ? (
                                  <Image
                                    src="http://192.168.1.14/assets/icons/tags/faktarumor.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "business-work" ? (
                                  <Image
                                    src="http://192.168.1.14/assets/icons/tags/bisnispekerjaan.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "fashion-lifestyle" ? (
                                  <Image
                                    src="http://192.168.1.14/assets/icons/tags/fashion.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "quotes" ? (
                                  <Image
                                    src="http://192.168.1.14/assets/icons/tags/quotes.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "other" ? (
                                  <Image
                                    src="http://192.168.1.14/assets/icons/tags/lainnya.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : data.tags === "riddles" ? (
                                  <Image
                                    src="http://192.168.1.14/assets/icons/tags/riddle.png"
                                    width="7%"
                                    style={{ float: "left" }}
                                  />
                                ) : null}
                              </small>
                              <small>
                                <i style={textMargin}>{data.tags}</i>
                              </small>
                            </List.Header>
                            <br />
                            <List.Description>
                              <b>{data.content}</b>
                              <br />
                              <br />
                              <Icon name="handshake outline" onClick={() => this.givethanks(data._id)} />
                              <small>
                                <i>{data.thanks} Thanks </i>
                              </small>
                              <small style={{ float: "right" }}>
                                <i>
                                  {data.jam} {data.menit} {data.date}
                                </i>
                              </small>
                              </List.Description>
                          </List.Content>
                        </List.Item>
                      </List>
                    </Segment>
                    <Divider hidden />
                  </GridColumn>
                  <Divider hidden />
                </Grid>
              );
            })}
            <Divider hidden />
            <Divider hidden />
            <Divider hidden />
          </Container>
        )}
      </div>
    );
  }
}
