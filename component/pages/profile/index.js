import React, { Component } from "react";
import MenuProfile from './MenuProfile';
import HeaderProfile from './HeaderProfile';
import MyPost from './MyPost';
import MoreCategory from './MoreCategory';

export default class Index extends Component {

    /*
    constructor(props){
        this.super(props);
        this.state = {
        }
    }
    */

    componentWillMount() {
        console.log('new state? >>>>>> ', this.state);
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
