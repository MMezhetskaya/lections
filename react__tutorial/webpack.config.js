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