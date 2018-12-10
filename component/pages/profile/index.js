import React, { Component } from "react";
import MenuProfile from './MenuProfile';
import HeaderProfile from './HeaderProfile';
import MyPost from "./MyPost";

import {Grid, Container, Segment, Divider, Image, Icon, GridColumn, List, Menu} from 'semantic-ui-react';


export default class Index extends Component {

    render () {
        return (
        <div>
            <HeaderProfile />
            <MyPost />
            <MenuProfile />
        </div>
        );
    }


}
