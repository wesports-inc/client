import React from "react";
import { Item } from "semantic-ui-react";

const Tournament = () => (
  <Item.Group>
    <Item>
      <Item.Image
        size="tiny"
        src="https://cnet4.cbsistatic.com/img/JFwr1sPOMnhFFUFLIxncUdcW-_I=/1600x900/2018/11/20/7c698e7f-195f-4820-9505-87311e466f75/klmajor2-2.jpg"
      />
      <Item.Content verticalAlign="middle">
        <Item.Header as="a">12 Years a Slave</Item.Header>
      </Item.Content>
    </Item>

    <Item>
      <Item.Image
        size="tiny"
        src="https://infotourney.com/images/media/images/tournament/dota2/2019/juli/turnamen-dota-dota2-juli-2019-dota-2-indonesia-professional-season-11-logo.jpg"
      />
      <Item.Content verticalAlign="middle">
        <Item.Header as="a" content="My Neighbor Totoro" />
      </Item.Content>
    </Item>

    <Item>
      <Item.Image
        size="tiny"
        src="https://infotourney.com/images/media/images/tournament/dota2/2019/juli/turnamen-dota-dota2-juli-2019-shun-esport-rookies-july-logo.jpg"
      />
      <Item.Content header="Watchmen" verticalAlign="middle" />
    </Item>
  </Item.Group>
);

export default Tournament;
