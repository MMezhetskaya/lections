import React from 'react';
import { connect } from 'react-redux';
import { ROUTING } from '../../constants/Routing';

export default function requireAuthentication(Component) {
    class AuthenticatedComponent extends Component {
        componentWillMount() {
            this.checkAuth(this.props.user);
        }

        componentWillReceiveProps(nextProps) {
            this.checkAuth(nextProps.user);
        }

        checkAuth(user) {
            if (!user.isAuthenticated) {
                this.props.dispatch({
                    type: ROUTING,
                    payload: {
                        method: 'replace',
                        nextUrl: '/login'
                    }
                })
            }
        }

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