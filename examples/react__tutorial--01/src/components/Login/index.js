import React, { Component } from 'react';

export default class Login extends Component {
    handleSubmit(e) {
        e.preventDefault();

        const value = e.target.elements[0].value;

        window.localStorage.setItem('login', value);
    }

    render() {
        return (
            <section>
                <h2>User login</h2>

                <form onSubmit={this.handleSubmit}>
                    <input type='text' placeholder='login' />

                    <button type='submit'>Login</button>
                </form>
            </section>
        )
    }
}