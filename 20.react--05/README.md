# React l.05

## Финальные штрихи или работа с API

> API (программный интерфейс приложения, интерфейс прикладного программирования) (англ. application programming interface, API [эй-пи-ай]) — набор готовых классов, процедур, функций, структур и констант, предоставляемых приложением (библиотекой, сервисом) или операционной системой для использования во внешних программных продуктах. Используется программистами при написании всевозможных приложений.

[wikipedia](https://ru.wikipedia.org/wiki/API)

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

## "Роутинг"? Нет не слышал

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

За исходную возьмем сборку с предыдущего задания, но немного её прокачаем

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
        express = require('express'),
        webpackDevMiddleware = require('webpack-dev-middleware'),
        webpackHotMiddleware = require('webpack-hot-middleware'),
        webpackConfig = require('./webpack/common.config'),
        compiler = webpack(webpackConfig);

    app
        .use(
            webpackDevMiddleware(
                compiler,
                {
                    noInfo: true,
                    publicPath: webpackConfig.output.publicPath,
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

        console.log(`🌎 Listening on: ${address}`);
        console.log(`-> that probably means: http://localhost:${address.port}`);
    }
);
```

- стандартный конфиг сервера на [Express](http://expressjs.com/)

#### Webpack config prod/dev версия

- создаем **webpack/common.config**

```js

```

## Заключение

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



## Справочники
- [FB developers apps](https://developers.facebook.com/apps/)
- [FB API test](https://developers.facebook.com/tools/explorer/)