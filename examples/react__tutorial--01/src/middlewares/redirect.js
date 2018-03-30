// import { withRouter } from 'react-router-dom';
import {
    ROUTING
} from '../constants/Routing'

export const redirect = store => next => action => { //eslint-disable-line no-unused-vars
    if (action.type === ROUTING) {
        // this.props.history[action.payload.method](action.payload.nextUrl);
    }

    return next(action);
};

// export default withRouter(redirect);
