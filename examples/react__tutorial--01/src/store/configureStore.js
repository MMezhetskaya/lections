import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from '../reducers';
import { createLogger } from 'redux-logger';
import { redirect } from '../middlewares/redirect';
import thunk from 'redux-thunk';

export default function configureStore(initialState) {
    const logger = createLogger(),
        store = createStore(
            rootReducer,
            initialState,
            applyMiddleware(redirect, thunk, logger)
        );

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');

            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}