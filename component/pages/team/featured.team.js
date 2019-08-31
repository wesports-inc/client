import React, { useState } from "react";
import { Grid, Header, Icon } from "semantic-ui-react";
import CarouselSlider from "react-carousel-slider";
import "../main.page.css";

function Content() {
  let datas = [
    {
      des: "SHX",
      imgSrc: "https://via.placeholder.com/150"
    },
    {
      des: "DET3",
      imgSrc: "https://via.placeholder.com/150"
    },
    {
      des: "TOTAL",
      imgSrc: "https://via.placeholder.com/150"
    },
    {
      des: "CRUSH",
      imgSrc: "https://via.placeholder.com/150"
    },
    {
      des: "JJKS",
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

  let premiumTeam = (
    <CarouselSlider
      sliderBoxStyle={{ height: "150px", width: "100%", background: "transparent" }}
      manner={{ autoSliding: { interval: "2s" } }}
      accEle={({ dots: false }, { button: false })}
      slideCpnts={Slides}
      itemsStyle={ItemsStyle}
    />
  );
  return <div style={{ position: "relative", margin: "0 auto", width: "100%" }}>{premiumTeam}</div>;
}

export const FeaturedTeam = () => {
  return (
    <div className="container-menu">
      <Grid columns="equal">
        <Grid.Column>
          <Header as="h3" className="header-content">
            Featured Team
            <span className="see-more-content">
              <Icon name="angle right" color="grey" size="large" />
            </span>
            <Header.Subheader style={{ marginTop: 2 }}>
              <span style={{ border: "1px solid green", borderRadius: "10%" }}>
                <span style={{ padding: 2 }}>Ads</span>
              </span>
            </Header.Subheader>
          </Header>
          {Content()}
        </Grid.Column>
      </Grid>
    </div>
  );
};
