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