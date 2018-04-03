import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class User extends Component {
    render() {
        const { name, error } = this.props;

        let template;

        if (name) {
            template = <p>Привет, {name}!</p>
        } else {
            template = <button className='btn' onClick={this.props.handleLogin}>Войти</button>
        }

        return <div>
            {template}
            {error ? <p> {error}. <br /> Попробуйте еще раз.</p> : ''}
        </div>
    }
}

User.propTypes = {
    name: PropTypes.string.isRequired,
    handleLogin: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired
};