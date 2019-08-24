import React from "react";
import { Container, Grid, Image, Button, Card } from "semantic-ui-react";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const AvailablePlayer = () => {
  return (
    <CarouselProvider totalSlides={2} interval={2500} isPlaying={true} naturalSlideHeight={25} naturalSlideWidth={50}>
      <Slider>
        <Slide index={0}>
          <Container style={{ marginTop: 15 }}>
            <Grid>
              <Card style={{ marginLeft: 15, width: "80%" }}>
                <Card.Content>
                  <Image floated="right" size="mini" src="https://img.icons8.com/bubbles/2x/user.png" />
                  <Card.Header>
                    <a href="#">Nur Cahyo</a>
                  </Card.Header>
                  <Card.Meta>Mage | Mobile Legends</Card.Meta>
                  <Card.Description>check out my profile, invite me if i'm in your criteria</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className="ui two buttons">
                    <Button basic color="green">
                      Invite
                    </Button>
                    <Button basic color="blue">
                      Save
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            </Grid>
          </Container>
        </Slide>
        <Slide index={1}>
          <Container style={{ marginTop: 15 }}>
            <Grid>
              <Card style={{ marginLeft: 15, width: "80%" }}>
                <Card.Content>
                  <Image floated="right" size="mini" src="https://img.icons8.com/bubbles/2x/user.png" />
                  <Card.Header>
                    <a href="#">Juheri</a>
                  </Card.Header>
                  <Card.Meta>Tanker | Mobile Legends</Card.Meta>
                  <Card.Description>pro gatot kaca dude, invite me if i'm in your criteria</Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className="ui two buttons">
                    <Button basic color="green">
                      Invite
                    </Button>
                    <Button basic color="blue">
                      Save
                    </Button>
                  </div>
                </Card.Content>
              </Card>
            </Grid>
          </Container>
        </Slide>
      </Slider>
    </CarouselProvider>
  );
};

export default AvailablePlayer;
