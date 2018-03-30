import {
    ROUTING
} from '../constants/Routing'

export const redirect = store => next => action => { //eslint-disable-line no-unused-vars
    if (action.type === ROUTING) {
        history[`${action.payload.method}State`]({}, '', action.payload.nextUrl);
        history.go(action.payload.nextUrl);
    }

    return next(action);
};
