import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Admin from './components/Admin';
import Login from './containers/LoginPage';
import Genre from './components/Genre';
import Home from './components/Home';
import List from './components/List';
import Release from './components/Release';
import NotFound from './components/NotFound';
import requireAuthentication from './containers/AuthenticatedComponent';

export const routes = (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/admin'  component={requireAuthentication(Admin)} />
        <Route exact path='/genre/:genre/:release' component={Release} />
        <Route exact path='/genre/:genre' component={Genre} />
        <Route exact path='/genre' component={List} />
        <Route component={NotFound} />
    </Switch>
);