# Lection l.20. React p.05.

## Финальные штрихи или работа с API

> API (программный интерфейс приложения, интерфейс прикладного программирования) (англ. application programming interface, API [эй-пи-ай]) — набор готовых классов, процедур, функций, структур и констант, предоставляемых приложением (библиотекой, сервисом) или операционной системой для использования во внешних программных продуктах. Используется программистами при написании всевозможных приложений. **[@Wiki](https://ru.wikipedia.org/wiki/API)**

- создадим приложение на **[FB developers apps](https://developers.facebook.com/apps/)**

- проверим **[FB API test](https://developers.facebook.com/tools/explorer/)**

- обновим **index.html -> head**

```html
<script>
    window.fbAsyncInit = function() {
        FB.init({
            appId      : '1565883546866383',
            xfbml      : true,
            version    : 'v2.12'
        });
        FB.AppEvents.logPageView();
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
</script>
```

### Логин

- обновим **src/actions/UserActions.js**

```js
/*global FB:true*/

import {
    LOGIN_REQUEST,
    LOGIN_SUCCES,
    LOGIN_FAIL
} from '../constants/User'

export function handleLogin() {
    return function(dispatch) {
        dispatch({
            type: LOGIN_REQUEST
        });

        FB.login(function(res) {
            if (res.authResponse) {
                FB.api('/me', (resUser) => {
                    dispatch({
                        type: LOGIN_SUCCES,
                        payload: resUser.name
                    });
                }, {scope: 'user_photos'} );

            } else {
                dispatch({
                    type: LOGIN_FAIL,
                    payload: new Error('Ошибка авторизации')
                });
            }
        });
    }
}
```

### Загрузка фото
 
- обновим **src/actions/PageActions.js**
 
```js
/*global FB:true*/

import {
    GET_PHOTOS_REQUEST,
    GET_PHOTOS_FAIL,
    GET_PHOTOS_SUCCESS
} from '../constants/Page';

function makeYearPhotos(photos, selectedYear) {
    let createdYear, yearPhotos = [];

    photos.forEach((item) => {
        createdYear = new Date(item.created_time).getFullYear();

        if (createdYear === selectedYear ) {
            yearPhotos.push(item)
        }
    });

    return yearPhotos.sort((a, b) => (b.likes && a.likes) ? b.likes.data.length - a.likes.data.length : -1);
}

function loadPhotos(year, dispatch) {
    FB.api(
        '/me/photos?fields=created_time,likes,images&limit=50',
        function (response) {
            if (response) {
                if (response.error) {
                    return dispatch({
                        type: GET_PHOTOS_FAIL,
                        error: true,
                        payload: response.error
                    });
                }

                dispatch({
                    type: GET_PHOTOS_SUCCESS,
                    payload: makeYearPhotos(response.data, year)
                });
            }
        }
    );
}

export function getPhotos(year) {
    return (dispatch) => {
        try {
            dispatch({
                type: GET_PHOTOS_REQUEST,
                payload: year
            });

            loadPhotos(year, dispatch);
        } catch(e) {
            dispatch({
                type: GET_PHOTOS_FAIL,
                error: true,
                payload: new Error(e)
            });
        }
    }
}
```

### Обновим?

- гость

    - не показывать интервал по годам
    
- залогиненный пользователь
    
    - компонент для установки кол-ва загруженных фото
    
    - динамически отображать интервал по годам в зависимости от загруженных фото
    
    - динамически отображать интервал по месяцам в зависимости от выбранного года

- добавить кеширование

- добавить сборку продакшен версии
    
- рефакторинг текущего кода must have

## "Роутинг"?

**Цели "роутинга" ?**

- доступ к разным страницам/разделам/состояниям приложения

- разделение прав доступа

- редиректы

## Что будем делать, или ТЗ

**Делаем примитивный музыкальный каталог:**

- есть список всех жанров

- есть страница альбомов жанра

- есть страница альбома

- есть страница администратора

### Структура сайта

```
/ - главная страница

/list - список жанров

/genre/:genre/ - страница альбомов жанра

/genre/:genre/:album - есть страница альбома

/admin - страница администратора
```

* ':' - динамический URL

### Структура директорий и файлов

```
+-- bin
|   +-- server.js
+-- src
|   +-- components
|   +-- containers
|   +-- index.js
+-- webpack
+-- index.html
+-- package.json
+-- server.js
```

### Dev окружение

- сборка с предыдущего задания, но немного её прокачаем

- просто установим [Create React App](https://reactjs.org/docs/add-react-to-a-new-app.html)

#### Создаем bin/server.js

```js
const fs = require('fs'),
    babelrc = fs.readFileSync('./.babelrc');

let config;

try {
    config = JSON.parse(babelrc);
} catch (err) {
    console.error('==>     ERROR: Error parsing your .babelrc.');
    console.error(err);
}

require('babel-core/register')(config);
require('../server');
```

**Зачем все это?**

- сможем выдавать красивое сообщение об ошибке, если не хватает какого-то из babel-preset'ов

- сможем код файла по адресу ../server относительно текущего писать на ES2015+

- модульность + 1 в карму 

#### Обновляем главный server.js

```js
const http = require('http'),
    express = require('express'),
    app = express(),
    port = 3000;

(function initWebpack() {
    const webpack = require('webpack'),
        webpackConfig = require('./webpack/common.config'),
        webpackDevMiddleware = require('webpack-dev-middleware'),
        webpackHotMiddleware = require('webpack-hot-middleware'),
        compiler = webpack(webpackConfig);

    app
        .use(
            webpackDevMiddleware(
                compiler,
                {
                    noInfo: true,
                    publicPath: webpackConfig.output.publicPath
                }
            )
        )
        .use(
            webpackHotMiddleware(
                compiler,
                {
                    log: console.log,
                    path: '/__webpack_hmr',
                    heartbeat: 10 * 1000,
                }
            )
        )
        .use(express.static(__dirname + '/'));
})();

app.get(
    /.*/,
    function root(req, res) {
        res.sendFile(__dirname + '/index.html');
    }
);

const server = http.createServer(app);

server.listen(
    process.env.PORT || port,
    function onListen() {
        const address = server.address();

        console.log('🌎 Listening on: %j', address);
        console.log(`-> that probably means: http://localhost:${address.port}`);
    }
);
```

- стандартный конфиг сервера на [Express](http://expressjs.com/)

#### Webpack config prod/dev версия

- создаем **webpack/common.config.js**

```js
const path = require('path'),
    merge = require('webpack-merge'),
    development = require('./dev.config.js'),
    production = require('./prod.config.js'),
    TARGET = process.env.npm_lifecycle_event,
    PATHS = {
        app: path.join(__dirname, '../src'),
        build: path.join(__dirname, '../dist'),
    };

process.env.BABEL_ENV = TARGET;

const common = {
    context: __dirname,

    entry: [
        PATHS.app,
    ],

    output: {
        path: __dirname,
        publicPath: '/dist/',
        filename: 'bundle.js'
    },

    resolve: {
        modules: ['node_modules', PATHS.app]
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    ignore: './node_modules/',
                    plugins: ['transform-runtime']
                }
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    ignore: './node_modules/'
                }
            }
        ]
    }
};

if (TARGET === 'dev' || !TARGET) {
    module.exports = merge(development, common);
}

if (TARGET === 'build' || !TARGET) {
    module.exports = merge(production, common);
}
```

- создаем **webpack/dev.config.js**

```js
const webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',

    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?quiet=true',
        'babel-polyfill',
        '../src/index'
    ],

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"',
            },
            __DEVELOPMENT__: true,
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
};
```

- создаем **webpack/prod.config.js**

```js
const webpack = require('webpack');

module.exports = {
    devtool: 'nosources-source-map',

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"',
            },
            __DEVELOPMENT__: false,
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        }),
    ],
};
```

#### Тестируем

- создаем **src/index.js**

```js
import 'babel-polyfill';
import React from 'react';
import { AppContainer } from 'react-hot-loader';
import { render } from 'react-dom';
import App from './containers/App';

const renderApp = AppMain => {
    render(
        <AppContainer>
            <AppMain />
        </AppContainer>,
        document.getElementById('root')
    )
};

renderApp(App);

if (module.hot) {
    module.hot.accept('./containers/App', () => {
        const newAppMain = require('./containers/App').default;

        renderApp(newAppMain);
    });
}
```

- создаем **containers/App.js**

```js
import React, { Component } from 'react'

export default class App extends Component {
    render() {
        return <div className='container'>Привет из App !!!</div>
    }
}
```

- проверим ?

```bash
npm run dev;

npm run build;
```

## Примитивный роутер

>Роутинг - соответствие URL-адреса некоему состоянию нашего приложения.

**Нам понадобится**

- [hashchange](https://developer.mozilla.org/en-US/docs/Web/Events/hashchange)

### Компонеты

- создадим **src/components/Admin.js**

```js
import React, { Component } from 'react';

export default class Admin extends Component {
    render() {
        return (
            <h2>Раздел /admin</h2>
        )
    }
}
```

- создадим **src/components/Genre.js**

```js
import React, { Component } from 'react';

export default class Genre extends Component {
    render() {
        return (
            <h2>Раздел /genre</h2>
        )
    }
}
```

- создадим **src/components/Home.js**

```js
import React, { Component } from 'react';

export default class Home extends Component {
    render() {
        return (
            <h2>Раздел /</h2>
        )
    }
}
```

### Контейнер

- добавим логики в **src/containers/App.js**

```js
import React, { Component } from 'react';
import Admin from '../components/Admin';
import Genre from '../components/Genre';
import Home from '../components/Home';


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            route: window.location.hash.substr(1)
        }
    }

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({
                route: window.location.hash.substr(1)
            });
        })
    }

    render() {
        let Child;

        switch (this.state.route) {
            case '/admin':
                Child = Admin;
                break;

            case '/genre':
                Child = Genre;
                break;

            default:
                Child = Home;
        }

        return (
            <div>
                <h1>App</h1>

                <ul>
                    <li><a href='#'>Home</a></li>
                    <li><a href='#/admin'>Admin</a></li>
                    <li><a href='#/genre'>Genre</a></li>
                </ul>
                <Child />
            </div>
        )

    }
}
```

## Подключаем react-router-dom

**Перспектива**

- появились другие URL-адреса
 
- что-то переросло во что-то большее

- появится больше ссылок

**Итог**

- трудноподдерживаемая путаница
 
**Зачем???** 

- "высокоуровневая" абстракция

- "плагин" с массой дополнительных плюшек

**Перепишем**

- установим **react-router-dom**

```bash
npm i react-router-dom --save
```

- **src/index.js**

```js
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
```

- **src/containers/App.js**

```js
import React, { Component } from 'react';
import { Link } from 'react-router-dom'

export default class App extends Component {
    render() {
        return (
            <div>
                <h1>App</h1>

                <ul>
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/admin'>Admin</Link></li>
                    <li><Link to='/genre'>Genre</Link></li>
                </ul>

                {this.props.children}
            </div>
        )
    }
}
```

- добавим для страниц 404 **src/components/NotFound.js**

```js
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class NotFound extends Component {
    render() {
        return (
            <p>
                Страница не найдена. Вернуться на <Link to='/'>главную</Link>?
            </p>
        )
    }
}
```

- обновим **src/index.js**

```js
...
import NotFound from './components/NotFound';

const renderApp = (App) => {
    render(
        <AppContainer>
            <BrowserRouter>
                <App>
                    <Switch>
                        ...
                        <Route component={NotFound} />
                    </Switch>
                </App>
            </BrowserRouter>
        </AppContainer>,
        document.getElementById('root')
    );
};

...
```

## Заключение

- Поработали с **API**

- Узнали что такое **роутинг**

- Подключили **react-router-dom**

## ДЗ

**Обновить приложение интеграции с FB**

- гость

    - не показывать интервал по годам
    
- залогиненный пользователь
    
    - компонент для установки кол-ва загруженных фото
    
    - динамически отображать интервал по годам в зависимости от загруженных фото
    
    - динамически отображать интервал по месяцам в зависимости от выбранного года
    
- добавить кеширование

- добавить сборку продакшен версии

- рефакторинг текущего кода must have

**Самостоятельно переписать приложение**

- семантика
 
- добавить стили и классы(BEM)

## Справочники
- [FB developers apps](https://developers.facebook.com/apps/)
- [FB API test](https://developers.facebook.com/tools/explorer/)
- [hashchange](https://developer.mozilla.org/en-US/docs/Web/Events/hashchange)