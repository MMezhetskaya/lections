# React l.03

## Современный web

- модульность

- компиляция на лету

- исходные файлы минимилизированны и сжаты в один

- и много много всего...

### [webpack](https://webpack.js.org/)

- Ставим **webpack**

```bash
npm init
npm i webpack webpack-dev-middleware webpack-hot-middleware --save-dev
```

- Создаем **webpack.config.js**

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

- Для начала установим **express**

```bash
npm i express react-hot-loader --save-dev
```

- Создаем **server.js** 

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

- Создаем **index.html**

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

- Запускаем

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

- Ставим **[babel](http://babeljs.io/)** 

```bash
npm i babel-core babel-loader --save-dev
```

- Ставим пресеты (предустановки)

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

- Настройки для **babel**,  .babelrc

```json
{
    "presets": ["env", "stage-0", "react"],
    "plugins": ["transform-runtime", "react-hot-loader/babel"]
}
```

- Создаем **src/index.js**

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

- Создадим **containers/App.js**

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