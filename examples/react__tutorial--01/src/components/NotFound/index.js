import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends Component {
    render() {
        return (
            <p>
                Страница не найдена. Вернуться на <Link to='/'>главную</Link>?
            </p>
        )
    }
}