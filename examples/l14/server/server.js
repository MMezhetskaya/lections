let http = require('http'),
    static = require('node-static'),
    file = new static.Server('../public'),
    port = 8080;

http
    .createServer(
        (req, res) => {
            file.serve(req, res);
        }
    )
    .listen(
        port,
        e => {
            if (e) return console.error(e);

            console.info(`==> 🌎 Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
        }
    );