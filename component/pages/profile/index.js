import React, { Component } from "react";
import MenuProfile from './MenuProfile';
import HeaderProfile from './HeaderProfile';
import MyPost from './MyPost';
import MoreCategory from './MoreCategory';

export default class Index extends Component {

    //check login auth & token from back end, if there is any user login then state of isLogin returning true
    //default isLogin value is false

    constructor(props) {
        super(props);
        this.state = {
            isLogin: false, //bypass login, make the value true throught this state
            token: ''
        };
    }

    componentWillMount() {
        fetch('/api/status')
        .then(res => res.json())
        .then(status => this.setState({ isLogin: status.auth, token: status.token }), () =>  console.log('set isLogin new State from backend status: ', this,state));
    }

    shouldComponentUpdate(newProps, newState){
        if(newState.isLogin){
            console.log('oucchh.. there is New State here: ', newState.isLogin);
            return true;
        }else{
            console.log('HMMM... there is NO New State for any variable');
            return false;
        }
    }

    componentWillUpdate(nextProps, nextState) {
        nextState.isLogin === false ? window.location = '#/login' : '';
        console.log('then i will Updating new State : ', nextState);
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('Lookup previous isLogin State: ', prevState);
    }

    render () {
        return (
        <div>
            <HeaderProfile />
            <MoreCategory />
            <MyPost />
            <MenuProfile />
        </div>
        );
    }


}
