let http = require('http'),
    static = require('node-static'),
    file = new static.Server('.'),
    port = 8080;

http
    .createServer(
        (req, res) => {
            file.serve(req, res);

            res.writeHead(
                200,
                {
                    'Content-Type': 'text/html',
                    'Cache-Control': 'no-cache'
                }
            );

            res.write('<h1>Im Title</h1>');
            res.end('<p>OK</p>');
        }
    )
    .listen(
        port,
        e => {
            if (e) return console.error(e);

            console.info(`==> 🌎 Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
        }
    );