import React, { Component } from "react";
import { Dimmer, Loader, Image, Segment, Container } from "semantic-ui-react";


export default class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLogin: '',
            email: '',
            loading: true
        };
    }

    componentWillMount() {
        
        const email = JSON.parse(localStorage.getItem('email'))
        const auth = JSON.parse(localStorage.getItem('auth'))
        this.setState({
            email,
            isLogin: auth
        })
    }

    componentDidMount() {
        if(this.state.isLogin != true){
            window.location='#/login';
        }
        console.log('first ', this.state.loading)
        setTimeout(() => {
            if(this.state.loading == true){
                this.setState({loading: false}, () => console.log('end: ', this.state.loading))
            }
        }, 500)
        
    }

    shouldComponentUpdate(newProps, newState){
        if(newState.isLogin){
            return true;
        }else{
            return false;
        }
    }

    componentWillUpdate(nextProps, nextState) {
        nextState.isLogin === "false" ? window.location = '#/login' : '';
    }

    componentDidUpdate(prevProps, prevState) {
        
    }

    loading() {
        return (
            <div>
                <Dimmer active inverted>
                    <Loader size='large'>Plase Wait</Loader>
                </Dimmer>
            </div>        
        );
    }

    render () {
        const { loading} = this.state;
        return (
        <div>
            {loading ? (this.loading()
            ) : (
                <Container>
                    hehehe
                </Container>
                )}
        </div>
        );
    }


}
