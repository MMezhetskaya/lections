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
