const {ProvidePlugin} = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = async (env = {}, argv) => {

    const devMode = argv.mode === 'development';

    return {
        mode: argv.mode,
        entry: {
            index: './src/index.js'
        },
        output: {
            filename: '[name].js',
            library: '[name]'
        },
        devtool: devMode ? 'source-maps' : 'eval',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loaders: [
                        'babel-loader',
                    ],
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            new ProvidePlugin({
                regeneratorRuntime: 'regenerator-runtime'
            })
        ]
    }
};
