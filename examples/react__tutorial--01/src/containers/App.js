import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class App extends Component {
    render() {
        return (
            <div>
                <h1>App</h1>

                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/admin'>Admin</Link></li>
                    <li><Link to='/genre'>Genre</Link></li>
                </ul>

                {this.props.children}
            </div>
        )
    }
}