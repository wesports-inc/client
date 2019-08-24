import React from "react";
import { Feed } from "semantic-ui-react";

const Activity = ({ status, time, users, team, image, summary }) => (
  <Feed>
    <Feed.Event>
      <Feed.Label image={image} />
      <Feed.Content date={time} summary={summary} />
    </Feed.Event>
  </Feed>
);

export default Activity;
