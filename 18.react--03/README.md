# React l.03

## Чего не хватало?

- модульность

- компиляция на лету

- исходные файлы минимилизированны и сжаты в один

### Создать структуру проекта <space><space>
```
/root
+-- /node_modules
+-- /src
+-- /static
+-- index.html
+-- package.json
+-- webpack.config.js
+-- server.js
```

### webpack

1. Ставим **webpack** <space><space>
```bash
npm i webpack webpack-dev-middleware webpack-hot-middleware --save-dev
```

2. Создаем конфиг файл **webpack.config.js** <space><space>
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
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
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
```bash
npm start
```

## Заключение

## ДЗ

## Справочники