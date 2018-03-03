const path = require('path'),
    merge = require('webpack-merge'),
    development = require('./dev.config.js'),
    production = require('./prod.config.js');

const TARGET = process.env.npm_lifecycle_event;

const PATHS = {
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