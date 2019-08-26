import React from "react";
import { Image, List } from "semantic-ui-react";
import { CarouselProvider, Slider, Slide } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

const AvailablePlayer = () => {
  return (
    <CarouselProvider totalSlides={3} interval={2500} isPlaying={true} naturalSlideHeight={10} naturalSlideWidth={50}>
      <Slider>
        <Slide index={0}>
          <List animated horizontal relaxed size="large">
            <List.Item>
              <Image avatar src="https://react.semantic-ui.com/images/avatar/small/christian.jpg" />
              <List.Content>
                <List.Header>
                  <a href="">Teday</a>
                </List.Header>
                <b>Tanker</b> - Mobile Legends
              </List.Content>
            </List.Item>
          </List>
        </Slide>
        <Slide index={1}>
          <List horizontal>
            <List.Item>
              <Image avatar src="https://react.semantic-ui.com/images/avatar/small/matt.jpg" />
              <List.Content>
                <List.Header>
                  <a href="">Hafidh</a>
                </List.Header>
                <b>Supports</b> - Mobile Legends
              </List.Content>
            </List.Item>
          </List>
        </Slide>
        <Slide index={2}>
          <List horizontal>
            <List.Item>
              <Image avatar src="https://react.semantic-ui.com/images/avatar/small/daniel.jpg" />
              <List.Content>
                <List.Header>
                  <a href="">Nur Cahyo</a>
                </List.Header>
                <b>Mage</b> - Mobile Legends
              </List.Content>
            </List.Item>
          </List>
        </Slide>
      </Slider>
    </CarouselProvider>
  );
};

export default AvailablePlayer;
