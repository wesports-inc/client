import React, { useState } from "react";
import { Grid, Header, Icon } from "semantic-ui-react";
import CarouselSlider from "react-carousel-slider";
import "../main.page.css";

function Content() {
  let datas = [
    {
      des: "Teday",
      imgSrc: "https://via.placeholder.com/150"
    },
    {
      des: "Ghinearyou",
      imgSrc: "https://via.placeholder.com/150"
    },
    {
      des: "NC",
      imgSrc: "https://via.placeholder.com/150"
    },
    {
      des: "Juheri",
      imgSrc: "https://via.placeholder.com/150"
    }
  ];

  let ItemsStyle = {
    padding: "0px",
    background: "transparent",
    margin: "0 15px",
    height: "90%"
  };

  let Slides = datas.map((item, index) => (
    <div key={index}>
      <img src={item.imgSrc}></img>
      <p style={{ width: "90%", top: "80%", fontSize: "12px" }}>{item.des}</p>
    </div>
  ));

  let lastPlayer = (
    <CarouselSlider
      sliderBoxStyle={{ height: "130px", width: "100%", background: "transparent" }}
      accEle={({ dots: false }, { button: false })}
      slideCpnts={Slides}
      itemsStyle={ItemsStyle}
    />
  );
  return <div style={{ position: "relative", margin: "0 auto", width: "100%" }}>{lastPlayer}</div>;
}

export const NewPlayer = () => {
  return (
    <div className="container-menu">
      <Grid columns="equal">
        <Grid.Column>
          <Header as="h3" className="header-content">
            New Joined Player
            <span className="see-more-content">
              <Icon name="angle right" color="grey" size="large" />
            </span>
          </Header>
          {Content()}
        </Grid.Column>
      </Grid>
    </div>
  );
};
