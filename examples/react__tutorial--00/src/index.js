import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import App from './containers/App';
import configureStore from './store/configureStore'
import { AppContainer } from 'react-hot-loader';

const store = configureStore(),
    renderApp = AppMain => {
        render(
            <AppContainer>
                <Provider store={store}>
                    <AppMain />
                </Provider>
            </AppContainer>,
            document.getElementById('root')
        );
    };

renderApp(App);

if (module.hot) {
    module.hot.accept('./containers/App', () => {
        const newAppMain = require('./containers/App').default;

        renderApp(newAppMain);
    });
}