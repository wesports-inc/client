import React, { Component } from "react";
import {Grid, Image, GridColumn, Container, Divider, GridRow} from 'semantic-ui-react';
import Skeleton from 'react-skeleton-loader';

export default class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isCategory: '',
            isLoading: true
        };
        this.generateSkeleton = this.generateSkeleton.bind(this)
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({isLoading: false})
        }, 500);
    }


    logout() {
        localStorage.removeItem('email')
        localStorage.removeItem('auth')
        window.location='#/login';
    }
    back() {
      window.location = "#/profile"
      localStorage.setItem('menu', 'profile');
    }

    generateSkeleton() {
        return(
            <Container>
                <Divider hidden/>
                <Grid columns={1}>
                <GridColumn> 
                    <Skeleton height= "300px" width="360px"></Skeleton>
                </GridColumn>
            </Grid>   
        </Container>
        );
    }


    render () {
        const { isLoading } = this.state;
        return (
        <div>
            {isLoading ? this.generateSkeleton() :
            <Grid columns={1}>
                <GridColumn> 
                    <Image src='https://via.placeholder.com/500/09f/fff.png' bordered fluid />
                    <Image src='https://via.placeholder.com/500/09f/fff.png' bordered fluid />
                    <Image src='https://via.placeholder.com/500/09f/fff.png' bordered fluid />
                </GridColumn>
            </Grid>
            }
        </div>            
    
        );
    }
}