import React, { Component } from "react";
import {Grid, Image, GridColumn, GridRow} from 'semantic-ui-react';

export default class Content extends Component {

    logout() {
        localStorage.removeItem('email')
        localStorage.removeItem('auth')
        window.location='#/login';
    }
    back() {
      window.location = "#/profile"
      localStorage.setItem('menu', 'profile');
    }

    render () {
        return (
    <Grid columns={1}>
        <GridColumn> 
        <Image src='https://via.placeholder.com/500/09f/fff.png' bordered fluid />
        <Image src='https://via.placeholder.com/500/09f/fff.png' bordered fluid />
        <Image src='https://via.placeholder.com/500/09f/fff.png' bordered fluid />
        </GridColumn>
    </Grid>
        );
    }
}