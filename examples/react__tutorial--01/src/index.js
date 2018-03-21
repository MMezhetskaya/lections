import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './containers/App';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Admin from './components/Admin';
import Genre from './components/Genre';
import Home from './components/Home';
import NotFound from './components/NotFound';

const renderApp = (App) => {
    render(
        <AppContainer>
            <BrowserRouter>
                <App>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/admin' component={Admin} />
                        <Route path='/genre' component={Genre} />
                        <Route component={NotFound} />
                    </Switch>
                </App>
            </BrowserRouter>
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