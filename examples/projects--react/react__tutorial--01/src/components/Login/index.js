import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
    constructor () {
        super();

        this.state = {
            isAdmin: false,
            fireRedirect: false
        }
    }

    componentDidMount() {
        let userName = window.localStorage.getItem('login');

        alert(`User name ${userName ? userName : ''}`);
    }

    handleSubmit(e) {
        e.preventDefault();

        const loginVal = e.target.elements[0].value;

        window.localStorage.setItem('login', loginVal);

        this.setState({
            isAdmin: loginVal === 'admin',
            fireRedirect: true
        });
    }

    render() {
        const { isAdmin, fireRedirect } = this.state;

        return (
            <section>
                <h2>User login</h2>

                <form onSubmit={::this.handleSubmit}>
                    <input type='text' placeholder='login' />

                    <button type='submit'>Login</button>
                </form>

                {fireRedirect && (<Redirect to={isAdmin ? '/admin' : '/'}/>)}
            </section>
        )
    }
}