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
let path = require('path'),
    webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ]
};
```

### server 

1. Для начала установим **express** <space><space>

```bash
npm i express --save-dev
```

2. Создаем **server.js** <space><space>

```js
let webpack = require('webpack'),
    webpackDevMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware'),
    config = require('./webpack.config'),
    app = new (require('express'))(),
    port = 3000,
    compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html')
});

app.listen(port, function(error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
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

4. Создаем **src/index.js** <space><space>

```js
document.getElementById('root').innerHTML = 'Привет, я готов.';
module.hot.accept();
```

5. Запускаем <space><space>

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
npm install babel-core babel-loader --save-dev
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

3. Подправим **webpack.config.js**  <space><space>

```js
let path = require('path'),
    webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        'babel-polyfill',
        './src/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
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

4. Настройки для **babel**,  .babelrc <space><space>

```js
{
  "presets": ["env", "stage-0", "react"],
  "plugins": ["transform-runtime"]
}
```

5. Установим **react** и **react-dom**  <space><space>

```bash
npm i react react-dom prop-types --save
```

7. Обновим **index.js** <space><space>

```js
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from './containers/App';

render(
    <App />,
    document.getElementById('root')
);
```

7. Создадим **containers/App.js** <space><space>

```js
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class App extends Component {
    render() {
        return <div>Привет из App</div>;
    }
}
```

### React + Hot Reload

Сборка без перезагрузки страницы в браузере.

```bash
npm i react-hot-loader --save-dev
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