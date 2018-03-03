const webpack = require('webpack');

module.exports = {
    devtool: 'cheap-module-eval-source-map',

    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client?quiet=true',
        'babel-polyfill',
        '../src/index'
    ],

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"development"',
            },
            __DEVELOPMENT__: true,
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    ],
};