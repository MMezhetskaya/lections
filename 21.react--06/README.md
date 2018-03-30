## Дописываем роуты

**Наши роуты**

```
/ - главная страница
/genre - список жанров
/genre/:genre/ - список релизов данного жанра
/genre/:genre/:release - информация о релизе
/admin - страница администратора
```

**Задача** 

Создать компонент, который будет доступен по адресу: localhost:3000/list

- создать компонент

- добавить компонент, как новый **Route**

**Реализация**

- **src/components/List.js**

```js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class List extends Component {
    render() {
        return (
            <section>
                <h3>Genre list</h3>

                <ul>
                    <li>
                        <Link to='/genre/house/'>House</Link>
                    </li>
                    <li>
                        <Link to='/genre/dnb/'>Drum and bass</Link>
                    </li>
                    <li>
                        <Link to='/genre/hip-hop/'>Hip-hop</Link>
                    </li>
                </ul>
            </section>
        )
    }
}
```

- **src/index.js**

```js
...

import List from './components/List';

...

const renderApp = (App) => {
    render(
        <AppContainer>
            <BrowserRouter>
                <App>
                    <Switch>
                        ...
                        
                        <Route exact path='/genre' component={List} />
                        
                        ...
                    </Switch>
                </App>
            </BrowserRouter>
        </AppContainer>,
        document.getElementById('root')
    );
};

...

```

## Динамический роут

**Задача** 

Создать компонент , который будет доступен по адресу: localhost:3000/genre/house

**Реализация**

- перейдем на Genre -> House

- **src/index.js**

```js

...

<Route exact path='/genre/:genre' component={Genre} />

...

```

- **src/components/Genre.js**

```js
...

export default class Genre extends Component {
    render() {
        return (
            <section>
                <h2>
                    {this.props.match.params.genre ? this.props.match.params.genre : 'Genre'}
                </h2>

                <div>
                    <p>
                        Release list
                    </p>
                </div>
            </section>
        );
    }
}
```

* __this.props.match.params__ - динамический

**Задача** 

Создать компонент, который будет доступен по адресу: localhost:3000/genre/house/dida-sebastien-leger-all-day-i-dream  

**Реализация**

- **src/index.js**

```js
...

import List from './components/Release';

...

const renderApp = (App) => {
    render(
        <AppContainer>
            <BrowserRouter>
                <App>
                    <Switch>
                        ...
                        
                        <Route exact path='/genre/:genre/:release' component={Release} />
                        
                        ...
                    </Switch>
                </App>
            </BrowserRouter>
        </AppContainer>,
        document.getElementById('root')
    );
};

...
```

- **src/components/Release.js**

```js
import React, { Component } from 'react'

export default class Release extends Component {
    render() {
        const releaseName = this.props.match.params.release.replace(/-/g,' ');

        return (
            <section>
                <h2>
                    {this.props.match.params.genre}
                </h2>

                <p>
                    {releaseName}
                </p>
            </section>
        )
    }
}
```

**Рефакторим**

- **src/index.js**

```js
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { routes } from './routes'
import App from './containers/App';

const renderApp = (App) => {
    render(
        <AppContainer>
            <BrowserRouter>
                <App>
                    {routes}
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
```

- **src/routes.js**

```js
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Admin from './components/Admin';
import Genre from './components/Genre';
import Home from './components/Home';
import List from './components/List';
import Release from './components/Release';
import NotFound from './components/NotFound';

export const routes = (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/admin' component={Admin} />
        <Route exact path='/genre' component={List} />
        <Route exact path='/genre/:genre' component={Genre} />
        <Route exact path='/genre/:genre/:release' component={Release} />
        <Route component={NotFound} />
    </Switch>
);
```

* [http://localhost:3000/genre/house/dida-sebastien-leger-all-day-i-dream](http://localhost:3000/genre/house/dida-sebastien-leger-all-day-i-dream)

## Активная ссылка

**Обновим структуру components**

```
src/components/Admin.js -> src/components/Admin/index.js

...

src/components/Release.js -> src/components/Release/index.js
```

**Зачем ?**

- компонент как независимый модуль

**Продолжим**

Для тех кто все-таки ленился, настал час!

- **src/containers/App/styles.scss**

```scss
.link {
  &--active {
    font-weight: bold;
  }
}
```

- **src/containers/App.js**

```js
...
import { NavLink } from 'react-router-dom';
import './styles.scss';

export default class App extends Component {
    render() {
        return (
            <div>
                ...

                <ul>
                    <li><NavLink to='/' exact activeClassName='link--active'>Home</NavLink></li>
                    <li><NavLink to='/admin' activeClassName='link--active'>Admin</NavLink></li>
                    <li><NavLink to='/genre' activeClassName='link--active'>Genre</NavLink></li>
                </ul>

                ...
            </div>
        )
    }
}
```

- **webpack/common.config.js**

```js
    ...
    autoprefixer = require('autoprefixer'),
    postcssImport = require('postcss-import'),
    ...
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    ...
    isDev = TARGET === 'dev';

...

const common = {
    ...

    module: {
        rules: [
            ...
            
            {
                test: /\.(scss|css)$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                ignore: '/node_modules/',
                                sourceMap: isDev,
                                minimize: !isDev
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: process.env.BABEL_ENV === 'dev',
                                plugins: (webpack) => [
                                    autoprefixer({
                                        browsers: ['last 2 versions'],
                                    }),
                                    postcssImport({
                                        addDependencyTo: webpack,
                                    })
                                ]
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                ignore: '/node_modules/',
                                sourceMap: isDev
                            }
                        }
                    ]
                })
            },
        ]
    },

    plugins: [
        new ExtractTextPlugin('bundle.css')
    ]
    
    ...
};

...
```

- установим пакеты

```bash
npm i --save-dev extract-text-webpack-plugin style-loader css-loader postcss postcss-loader autoprefixer sass-loader node-sass
``` 

- **index.html**

```html
<!DOCTYPE html>
<html>
<head>
    ...
    <link rel="stylesheet" href="/dist/bundle.css">
</head>
    
...

</html>
```

## Redirect

**Зачем?**

Хочется, чтобы пользователь при заходе на сайт, попадал сразу на отображение указанного компонента.

**Как?**

```js
<Redirect from='/old-path' to='/new-path' />
```

## Разделение доступа

**Задача**

- вход как администратор

- обычный пользователь

**Реализация**

- **src/components/Login/index.js**

```js
import React, { Component } from 'react';

export default class Login extends Component {
    handleSubmit(e) {
        e.preventDefault();
        
        const value = e.target.elements[0].value;

        window.localStorage.setItem('login', value);
    }

    render() {
        return (
            <section>
                <h2>User login</h2>

                <form onSubmit={::this.handleSubmit}>
                    <input type='text' placeholder='login' />

                    <button type='submit'>Login</button>
                </form>
            </section>
        )
    }
}
```

- **src/routes.js**

```js
...

import Login from './components/Login';

...

export const routes = (
    <Switch>
        ...
        
        <Route exact path='/login' component={Login} />
        
        ...
    </Switch>
);
```

- **src/containers/App.js**

```js
...

export default class App extends Component {
    render() {
        return (
            <div>
                ...

                <ul>
                    ...
                    
                    <li><NavLink to='/login' activeClassName='link--active'>Login</NavLink></li>
                </ul>

                ...
            </div>
        )
    }
}
```

### Xук

> Хук - действие на событие.

**Задача**

- переход на **/admin**, редирект на  **/login**  в случае если пользователь не **admin**

- после логина редирект на  **/admin** если  **admin**, в противном случае на гланую **/**

**Реализация**

- **src/routes.js**

```js
...

import { Route, Switch, Redirect } from 'react-router-dom';

...

export const routes = (
    <Switch>
        ...
        
        <Route exact path='/admin' render={() => checkLogin()}/>
        
        ...
    </Switch>
);

function checkLogin() {
    const login = window.localStorage.getItem('login');

    return (login === 'admin') ? <Admin /> : <Redirect to='/login' />;
}
```

- **src/components/Login/index.js**

```js
...
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
    constructor () {
        super();

        this.state = {
            isAdmin: false,
            fireRedirect: false
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const loginVal = e.target.elements[0].value;

        window.localStorage.setItem('login', loginVal);

        this.setState({
            isAdmin: loginVal === 'admin',
            fireRedirect: true
        });
    }

    render() {
        const { isAdmin, fireRedirect } = this.state;

        return (
            <section>
                ...

                {fireRedirect && (<Redirect to={isAdmin ? '/admin' : '/'}/>)}
            </section>
        )
    }
}
```

## componentDidMount, componentWillUnmount

**Задача**

- переход на **/login**, сообщение с именем текущего пользователя

- покидаем **/admin**, сообщение

**Реализация**

- **src/components/Login/index.js**

```js
...

export default class Login extends Component {
    ...

    componentDidMount() {
        let userName = window.localStorage.getItem('login');

        alert(`User name ${userName ? userName : ''}`);
    }

    ...
}
```

- **src/components/Admin/index.js**

```js
...

export default class Admin extends Component {
    componentWillUnmount() {
        confirm('Are you sure?');
    }

    ...
}
```

## Подключаем redux

```bash
npm i --save redux react-redux
npm i --save-dev redux-logger redux-thunk
```

**Задача**

- пользователь кликает на **Admin**

- залогинен - пропускаем его на страницу

- не залогинен - отправлям его на страницу логина

**Мда, но у нас же уже все сделано!!!**

- во время логина мы сделаем задержку (как будто ждем ответ от сервера), и лишь когда пришел ответ - перенаправим браузер пользователя на **/admin** роутинг будет выполняться посредством **store.dispatch**

- а просто для того что-бы освежить знания про **redux**

**Решение**

- **src/index.js**

```js
...
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

const renderApp = (App) => {
    render(
        <AppContainer>
            <Provider store={store}>
                ...
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    );
};

...
```

- **src/routes.js**

```js
...
import Login from './containers/LoginPage';
...

export const routes = (
    <Switch>
        ...
        <Route exact path='/login' component={Login} />
        ...
    </Switch>
);

...
```

- создаем **константы** для пользователя **src/constants/User.js**

```js
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT_SUCCES = 'LOGOUT_SUCCESS';
```

- создаем **actions** для пользователя **src/actions/UserActions.js**

```js
/* eslint-disable no-unused-vars */

import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
} from '../constants/User'

export function login(payload) {
    // TODO
    return {
        type: LOGIN_REQUEST
    };
}

export function logout() {
    return {
        type: LOGOUT_SUCCESS
    };
}

/* eslint-enable no-unused-vars */
```

- создаем **reducers** для пользователя **src/reducers/user.js**

```js
import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS
} from '../constants/User';

const initialState = JSON.parse(window.localStorage.getItem('user')) || {};

export default function userstate(state = initialState, action) {

    switch (action.type) {

        case LOGIN_REQUEST:
            // TODO
            return {};

        case LOGIN_SUCCESS:
            // TODO
            return {};

        case LOGIN_FAIL:
            // TODO
            return {};

        case LOGOUT_SUCCESS:
            // TODO
            return {};

        default:
            return state;
    }
}
```

- **src/reducers/index.js**

```js
import { combineReducers } from 'redux';
import user from './user';

export const rootReducer = combineReducers({
    user
});
```

- конфигурируем **store** **src/store/configureStore.js**

```js
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk'

export default function configureStore(initialState) {
    const logger = createLogger(),
        store = createStore(
            rootReducer,
            initialState,
            applyMiddleware(thunk, logger)
        );

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers');

            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
```

- превратим  **<Login />** в "умный компонент" **<LoginPage />** **src/containers/LoginPage/index.js**

```js
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as UserActions from '../../actions/UserActions';

export class LoginPage extends Component {
    handleSubmit(e) {
        e.preventDefault();
        this.props.actions.login({name: e.target.elements[0].value});
    }

    render() {
        return (
            <section>
                <h2>User login</h2>

                <form onSubmit={::this.handleSubmit}>
                    <input type='text' placeholder='login' />

                    <button type='submit'>Login</button>
                </form>
            </section>
        )
    }
}

function mapStateToProps() {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(UserActions, dispatch);
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
```

### store.dispatch редирект

- пробуем залогинится -> смотрим в консоль

- **src/actions/UserActions.js**

```js
...
export function login(payload) {
    return (dispatch) => {
        dispatch({
            type: LOGIN_REQUEST
        });

        setTimeout(() => {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    name: payload.name,
                    isAuthenticated: true
                }
            })
        }, 2000)
    }
}
...
```

- **src/reducers/user.js**

```js
...
    case LOGIN_SUCCESS:
        return {...state, name: action.payload.name, isAuthenticated: action.payload.isAuthenticated};
...
```

- проверяем консоль

###  Cоздание middleware для роутинга

- **src/constants/Routing.js**

```js
export const ROUTING = 'ROUTING';
```

- **src/middlewares/redirect.js**

```js
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
```

- **src/actions/UserActions.js**

```js
...
import {
    ROUTING
} from '../constants/Routing';

export function login(payload) {
    return (dispatch) => {
        ...
        
        setTimeout(() => {
            ...

            dispatch({
                type: ROUTING,
                payload: {
                    method: 'push', //или, например, replace
                    nextUrl: '/admin'
                }
            });
        }, 2000);
    }
}

...
```

- **src/store/configureStore.js**

```js
...
import { redirect } from '../middlewares/redirect';
...

export default function configureStore(initialState) {
    const logger = createLogger(),
        store = createStore(
            ...
            applyMiddleware(redirect, thunk, logger)
        );

    ...
}
```

## Заключение

## ДЗ
