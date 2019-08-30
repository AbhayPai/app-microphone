const Path = require("path");
const Webpack_DIR = __dirname;
const CssNano = require('cssnano');
const SetMeUp = require('./setmeup');
const CustomTimeHash = new Date().getTime();
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
    entry: new SetMeUp({
        Path,
        Webpack_DIR
    }).entry,

    output: {
        filename: 'js/[name].' + CustomTimeHash + '.js',
        path: Path.join(Webpack_DIR, 'web/')
    },

    resolve: {
        alias: new SetMeUp({
            Path,
            Webpack_DIR
        }).alias
    },

    module:{
        rules: [{
            test: /\.js$/,
            enforce: 'pre',
            exclude: /node_modules/,
            use: {
                loader: 'eslint-loader',
                options: {
                    configFile: './.eslintrc.json'
                },
            },
        }, {
            test: /\.(js|jsx)$/,
            use: [
                'babel-loader',
            ],
            exclude: /node_modules/,
        }, {
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                }, {
                    loader: 'sass-loader'
                }
            ]
        }, {
            test: /\.(jpe?g|png|gif|ico)$/i,
            use: 'file-loader?name=/web/images/[name].[ext]',
        }, {
            test: /\.woff|woff2|eot|ttf|svg$/,
            use: {
                loader: 'url-loader'
            }
        }
    ]},

    plugins: [
        new ManifestPlugin({
            filter: ({name}) => !name.endsWith('.php')
        }),

        new CleanWebpackPlugin({
            verbose:  true,
            cleanStaleWebpackAssets: false
        }),

        new UglifyJsPlugin({
            cache: false,
            sourceMap: true,
            uglifyOptions: {
                mangle: true,
                compress: true,
                ie8: true,
                output: {
                    comments: false,
                },
            },
            exclude: /node_modules/,
        }),

        new MiniCssExtractPlugin({
            filename: './css/[name].' + CustomTimeHash + '.css'
        }),

        new CopyWebpackPlugin(
            new SetMeUp({
                Path,
                Webpack_DIR
            }).copyFiles
        ),

        new OptimizeCssAssetsPlugin({
            canPrint: true,
            cssProcessor: CssNano,
            cssProcessorPluginOptions: {
                preset: [
                    'default',
                    {
                        discardComments: {
                            removeAll: true
                        }
                    }
                ],
            },
        }),
    ].concat(
        new SetMeUp({
            Path,
            Webpack_DIR,
            CustomTimeHash,
            HtmlWebpackPlugin
        }).createHtml()
    )
};
