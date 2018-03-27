import React, { Component } from 'react';

export default class Genre extends Component {
    render() {
        return (
            <section>
                <h2>
                    {this.props.match.params.genre ? this.props.match.params.genre : 'Genre'}
                </h2>

                <div>
                    <p>Release list</p>
                </div>
            </section>
        );
    }
}