import React, { Component } from "react";
import {
  Modal,
  Container,
  Comment,
  Icon,
  Item,
  Image,
  Divider,
  Form,
  Button
} from "semantic-ui-react";
import Skeleton from "react-skeleton-loader";
import axios from "axios";

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <div>
        <Container>
          <Item.Group>
            <Item>
              <Item.Image size='tiny' src='/images/wireframe/image.png' />
              <Item.Content>
                <Item.Header as='a'>Nam Lengkap</Item.Header>
                <Item.Description>
                  Postingan
                </Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
          <Divider />
          <Comment.Group>
            <Comment>
              <Comment.Avatar as='a' src='/images/avatar/small/stevie.jpg' />
              <Comment.Content>
                <Comment.Author>Stevie Feliciano</Comment.Author>
                <Comment.Metadata>
                  <div>2 days ago</div>
                  <div>
                    <Icon name='star' />
                    5 Faves
                  </div>
                </Comment.Metadata>
                <Comment.Text>
                  Hey guys, I hope this example comment is helping you read this documentation.
                </Comment.Text>
              </Comment.Content>
            </Comment>

            <Comment>
              <Comment.Avatar as='a' src='/images/avatar/small/stevie.jpg' />
              <Comment.Content>
                <Comment.Author>Stevie Feliciano</Comment.Author>
                <Comment.Metadata>
                  <div>2 days ago</div>
                  <div>
                    <Icon name='star' />
                    5 Faves
                  </div>
                </Comment.Metadata>
                <Comment.Text>
                  Hey guys, I hope this example comment is helping you read this documentation.
                </Comment.Text>
              </Comment.Content>
            </Comment>
            <Comment.Action>
            <Divider hidden/>
            <Form reply>
              <Form.TextArea />
                <Button content='Post Comment' labelPosition='left' icon='edit' primary />
            </Form>
            </Comment.Action>
          </Comment.Group>    
        </Container>
      </div>
    );
  }
}
