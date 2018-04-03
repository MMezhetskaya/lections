import React, { Component } from 'react'

export default class Release extends Component {
    render() {
        const releaseName = this.props.match.params.release.replace(/-/g,' ');

        return (
            <section>
                <h2>
                    {this.props.match.params.genre}
                </h2>

                <p>
                    {releaseName}
                </p>
            </section>
        )
    }
}