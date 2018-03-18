import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './containers/App';
import { BrowserRouter, Route } from 'react-router-dom';
import Admin from './components/Admin';
import Genre from './components/Genre';
import Home from './components/Home';
import NotFound from './components/NotFound';

const renderApp = AppMain => {
    render(
        <AppContainer>
            <BrowserRouter>
                <AppMain>
                    <Route exact path='/' component={Home} />
                    <Route path='/admin' component={Admin} />
                    <Route path='/genre' component={Genre} />
                    <Route path='*' component={NotFound} />
                </AppMain>
            </BrowserRouter>
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