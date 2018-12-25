import React, { Component } from "react"
import { Container, Grid, Divider, Image, Segment } from "semantic-ui-react"
import axios from 'axios'

export default class HeaderProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: sessionStorage.getItem('username'),
      profile: []
    };
  }

  componentWillMount() {
    axios({
        method: 'post',
        url: '/api/people/profile/get',
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        data: {
          username: this.state.username, // This is the body part
        }
      }).then(result => this.setState({profile: result.data}));
  }
  
  
  render() {
    const {profile} = this.state
        //simple css styling
        const smallFont = {
            fontSize: 10
          }
          const toRight = {
            float: "right"
          }
    return (
        <div style={{marginBottom: 45}}>
        <Container>
            {profile.map(data => {  
                return (
                    <Grid columns={2} style={{background: "#555"}} key={data._id}>
                    <Divider hidden />
                      <Grid.Row stretched>
                        <Grid.Column>
                            <Image src='https://artsy-media-uploads.s3.amazonaws.com/2P6t_Yt6dF0TNN76dlp-_Q%2F3417757448_4a6bdf36ce_o.jpg' circular/>
                            <p style={{textAlign: "center", marginTop: 15, color: "white"}}>@{this.state.username}<br/>{data.first_name} {data.last_name}</p>
                        </Grid.Column>
                        <Grid.Column style={{opacity: 0.9}}>
                          <Segment>
                            <p style={smallFont}>Posts <span style={toRight}>{data.total_posts}</span></p>
                            <p style={smallFont}>Thanks <span style={toRight}>{data.total_thanks}</span></p>
                            <p style={smallFont}>Friends <span style={toRight}><u style={{color: "blue"}}>{data.total_friends}</u></span></p>
                            <p style={smallFont}>Awards <span style={toRight}><u style={{color: "blue"}}>{data.awards}</u></span></p>
                            <p style={smallFont}>Join Date <span style={toRight}><i>{data.join_date}</i></span></p>
                            <p style={smallFont}>Followed Topic <span style={toRight}><u style={{color: "blue"}}>{data.tags}</u></span></p>
                          </Segment>
                        </Grid.Column>
                      </Grid.Row>
                    </Grid>
            ); })}
        </Container>
        
        </div>
    )
    }
}
