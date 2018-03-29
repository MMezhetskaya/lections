import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { routes } from './routes';
import App from './containers/App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

const renderApp = (App) => {
    render(
        <AppContainer>
            <Provider store={store}>
                <BrowserRouter>
                    <App>
                        {routes}
                    </App>
                </BrowserRouter>
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    );
};

renderApp(App);

if (module.hot) {
    module.hot.accept('./containers/App', () => {
        const newApp = require('./containers/App').default;

        renderApp(newApp);
    });
}