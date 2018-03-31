import React from 'react';
import { connect } from 'react-redux';

export default function requireAuthentication(Component) {
    class AuthenticatedComponent extends Component {
        render() {
            return (
                this.props.user.isAuthenticated === true
                    ? <Component {...this.props} />
                    : null
            )
        }
    }

    function mapStateToProps(state) {
        return {
            user: state.user
        }
    }

    return connect(mapStateToProps)(AuthenticatedComponent);
}