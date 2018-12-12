import React, { Component } from "react";
import MenuProfile from './MenuProfile';
import HeaderProfile from './HeaderProfile';
import MyPost from './MyPost';
import MoreCategory from './MoreCategory';

export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: false,
            email: ''
        };
    }

    componentWillMount() {
        console.log('>>>>>>>>>>>><<<<<<<<<<<<<<', localStorage.getItem('userdata'))
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
