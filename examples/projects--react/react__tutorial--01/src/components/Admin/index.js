import React, { Component } from 'react';

export default class Admin extends Component {
    componentWillUnmount() {
        confirm('Are you sure?');
    }

    render() {
        return (
            <h2>Раздел /admin</h2>
        )
    }
}