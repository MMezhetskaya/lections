import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActions from '../../actions/UserActions';

export class LoginPage extends Component {
    handleSubmit(e) {
        e.preventDefault();
        this.props.actions.login({name: e.target.elements[0].value});
    }

    render() {
        return (
            <section>
                <h2>User login</h2>

                <form onSubmit={::this.handleSubmit}>
                    <input type='text' placeholder='login' />

                    <button type='submit'>Login</button>
                </form>
            </section>
        )
    }
}

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(UserActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);