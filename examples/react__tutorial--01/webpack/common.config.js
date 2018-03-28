const path = require('path'),
    autoprefixer = require('autoprefixer'),
    postcssImport = require('postcss-import'),
    merge = require('webpack-merge'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    development = require('./dev.config.js'),
    production = require('./prod.config.js'),
    TARGET = process.env.npm_lifecycle_event,
    PATHS = {
        app: path.join(__dirname, '../src'),
        build: path.join(__dirname, '../dist'),
    },
    isDev = TARGET === 'dev';

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
            },
            {
                test: /\.(scss|css)$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                ignore: '/node_modules/',
                                sourceMap: isDev,
                                minimize: !isDev
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: process.env.BABEL_ENV === 'dev',
                                plugins: (webpack) => [
                                    autoprefixer({
                                        browsers: ['last 2 versions'],
                                    }),
                                    postcssImport({
                                        addDependencyTo: webpack,
                                    })
                                ]
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                ignore: '/node_modules/',
                                sourceMap: isDev
                            }
                        }
                    ]
                })
            },
        ]
    },

    plugins: [
        new ExtractTextPlugin('bundle.css')
    ]
};

if (TARGET === 'dev' || !TARGET) {
    module.exports = merge(development, common);
}

if (TARGET === 'build' || !TARGET) {
    module.exports = merge(production, common);
}