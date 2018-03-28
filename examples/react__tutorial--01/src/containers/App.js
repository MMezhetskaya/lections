import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './styles.scss';

export default class App extends Component {
    render() {
        return (
            <div>
                <h1>App</h1>

                <ul>
                    <li><NavLink to='/' exact activeClassName='link--active'>Home</NavLink></li>
                    <li><NavLink to='/genre' activeClassName='link--active'>Genre</NavLink></li>
                    <li><NavLink to='/admin' activeClassName='link--active'>Admin</NavLink></li>
                    <li><NavLink to='/login' activeClassName='link--active'>Login</NavLink></li>
                </ul>

                {this.props.children}
            </div>
        )
    }
}