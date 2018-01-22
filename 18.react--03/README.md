# React l.03

## Современный web

- модульность

- компиляция на лету

- исходные файлы минимилизированны и сжаты в один

- и много много всего...

### [webpack](https://webpack.js.org/)

1. Ставим **webpack** <space><space>
```bash
npm init
npm i webpack webpack-dev-middleware webpack-hot-middleware --save-dev
```

2. Создаем **webpack.config.js** <space><space>
```js
const webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    context: __dirname,
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?quiet=true',
        'babel-polyfill',
        './src/index'
    ],
    output: {
        path: __dirname,
        publicPath: '/static/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                options: {
                    ignore: './node_modules/'
                }
            }
        ]
    }
};
```

### server + React + Hot Reload 

1. Для начала установим **express** <space><space>
```bash
npm i express react-hot-loader --save-dev
```

2. Создаем **server.js** <space><space>
```js
const webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    conf = require('./webpack.config'),
    compiler = webpack(conf),
    app = new (require('express'))(),
    port = 3000;

app
    .use(
        webpackDevMiddleware(
            compiler,
            {
                noInfo: true,
                publicPath: conf.output.publicPath
            }
        ),
        webpackHotMiddleware(compiler)
    )
    .get(
        "*",
        (req, res) => res.sendFile(`${__dirname}/index.html`)
    )
    .listen(port, e => {
        if (e) return console.error(e);

        console.info(`==> 🌎 Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`)
    });
```

3. Создаем **index.html** <space><space>
```html
<!DOCTYPE html>
<html>
    <head>
        <title>Redux tutorial</title>
    </head>
    
    <body>
        <div id="root">
        </div>
        <script src="/static/bundle.js"></script>
    </body>
</html>
```

4. Запускаем <space><space>
```js
...
"scripts": {
    "start": "node server.js"
}
...
```

```bash
npm start
```

### [babel](http://babeljs.io/)

1. Ставим **[babel](http://babeljs.io/)** <space><space>
```bash
npm i babel-core babel-loader --save-dev
```

2. Ставим пресеты (предустановки) <space><space>
```bash
// Для поддержки ES6/ES2015
npm install babel-preset-es2015 --save-dev
npm install babel-preset-env --save-dev

// Для поддержки JSX
npm install babel-preset-react --save-dev

// Для поддержки ES7
npm install babel-preset-stage-0 --save-dev

// Polyfill
npm install babel-polyfill --save

// Время сборки
npm install babel-runtime --save
npm install babel-plugin-transform-runtime --save-dev
```

3. Настройки для **babel**,  .babelrc <space><space>
```json
{
    "presets": ["env", "stage-0", "react"],
    "plugins": ["transform-runtime", "react-hot-loader/babel"]
}
```

4. Создаем **src/index.js** <space><space>
```bash
npm i react react-dom prop-types --save
```

```js
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './containers/App';

const renderApp = AppRoutes => {
    render(
        <AppContainer>
            <AppRoutes />
        </AppContainer>,
        document.getElementById('root')
    );
};

renderApp(App);

if (module.hot) {
    module.hot.accept('./containers/App', () => {
        const newRoutes = require('./containers/App').default;

        renderApp(newRoutes);
    });
}
```

5. Создадим **containers/App.js** <space><space>
```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class App extends Component {
    render() {
        return <div>Привет из App</div>;
    }
}
```

### ESLint

Быстро решает синтаксические ошибки и повышает производительность.


## Заключение

## ДЗ

## Справочники
- [webpack](https://webpack.js.org/)
- [Screencast webpack](https://learn.javascript.ru/screencast/webpack)
- [babel](http://babeljs.io/)
- [redux](https://redux.js.org/index.html)