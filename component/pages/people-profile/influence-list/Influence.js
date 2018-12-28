import React, { Component } from "react";
import axios from "axios"

export default class Influence extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email_friend: sessionStorage.getItem('email_friend'),
            datas: [],
            newData: [],
            lastData: []
        };
    }
    componentWillMount(){
        axios({
            method: 'post',
            url: '/api/follower/list',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            data: {
              email: this.state.email_friend, // This is the body part
            }
          }).then(result => {this.setState({datas: result.data})
          var newData = []
          this.state.datas.forEach(function(data) {
            newData.push(data.email)
          })
          this.setState({lastData: newData}, () => console.log('ok: ', this.state.lastData))
        })
    }

    componentDidUpdate(){
    }
    render () {
        const {lastData} = this.state
        return (
           <div>
                <p>
                    {[lastData]}
                </p>
           </div>
        );
    }
}
