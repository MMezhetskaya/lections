import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class List extends Component {
    render() {
        return (
            <section>
                <h2>Genre list</h2>

                <ul>
                    <li>
                        <Link to='/genre/house/'>House</Link>
                    </li>
                    <li>
                        <Link to='/genre/dnb/'>Drum and bass</Link>
                    </li>
                    <li>
                        <Link to='/genre/hip-hop/'>Hip-hop</Link>
                    </li>
                </ul>
            </section>
        )
    }
}