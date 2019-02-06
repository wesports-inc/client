import React, { Component } from "react";
import {
  Modal,
  Container,
  Comment,
  Icon,
  Item,
  Image,
  Divider,
  Input,
  Form,
  ItemMeta
} from "semantic-ui-react";
import Skeleton from "react-skeleton-loader";
import axios from "axios";

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.getItem("email").slice(1, -1),
      username: localStorage.getItem("username"),
      posts: [],
      comment: '',
      message: '',
      id_posts: '',
      url: window.location.href.split('=')[1]
    };
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount() {
    axios.get('/api/posts/' + this.state.url)
    .then(response => {
      this.setState({posts: response.data})
    })
  }

  handleChange(event) {
    let target = event.target;
    let value = target.value;
    let name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    axios({
      method: "POST",
      url: "/api/posts/comment",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      data: {
        id_posts: this.state.id_posts,
        email: this.state.email,
        username: this.state.username,
        comment: this.state.comment,
        status: "publish"
      }
    }).then(result => console.log('hasil: ', result));
  }
  
  render() {
    const {posts, url} = this.state;
    return (
      <div>
        <Container >
          <Item.Group>
            <Item>
              <Item.Content>
                <ItemMeta as='a' style={{color: "black"}}><Image avatar src='https://cdn.iconscout.com/icon/free/png-256/avatar-372-456324.png'/> @{posts.username}</ItemMeta>
                <Item.Description style={{padding: 15, margin: 5}}>
                  {posts.content}
                </Item.Description>
                <Divider hidden/>
                <Divider hidden/>
                <ItemMeta>
                <small><i>post on {posts.tags}</i></small>
                <small style={{float: "right"}}>{posts.jam}:{posts.menit} </small></ItemMeta>
              </Item.Content>
            </Item>
          </Item.Group>
          <Divider />
          <Comment.Group>
            <Comment>
              <Comment.Avatar as='a' src='https://cdn.iconscout.com/icon/free/png-256/avatar-369-456321.png' />
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
            <Form onSubmit={this.handleSubmit}>
            <input name="id_posts" onChange={this.handleChange} hidden/>
            <Input name="comment" style={{bottom: 10, position: "fixed", zIndex: 99, padding: 10, margin: 5, width: "85%" }} size="large" transparent placeholder='komentari ...' icon='paper plane outline' onChange={this.handleChange}/>
            </Form>
            </Comment.Action>
          </Comment.Group>    
        </Container>
      </div>
    );
  }
}
