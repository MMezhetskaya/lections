import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from './containers/App';
import { AppContainer } from 'react-hot-loader';

const renderApp = AppMain => {
    render(
        <AppContainer>
            <AppMain />
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
