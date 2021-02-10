const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const fs = require('fs')
const pagesDir = path.resolve(__dirname, 'src/pages')
const pages = fs.readdirSync(pagesDir)
// const htmlWebpackPages = pages.map( page => {
//     return (
//         new HtmlWebpackPlugin({
//             filename: `${page}.html`,
//             template: `${pagesDir}/${page}/${page}.pug`,
//         })
//     )
// })

const optimization = () => {
    const config = {
        splitChunks: {
            cacheGroups: {
                colorstype: {
                    test: /colors-type.js/,
                    name: 'colors-type', // имя чанка
                    chunks: 'initial',
                    enforce: true,
                },
                formelements: {
                    test: /form-elements.js/,
                    name: 'form-elements',
                    chunks: 'initial',
                    enforce: true,
                },
                cards: {
                    test: /cards.js/,
                    name: 'cards',
                    chunks: 'initial',
                    enforce: true,
                },
                headersfooters: {
                    test: /headers-footers.js/,
                    name: 'headers-footers',
                    chunks: 'initial',
                    enforce: true,
                },
                landingpage: {
                    test: /landing-page.js/,
                    name: 'landing-page',
                    chunks: 'initial',
                    enforce: true,
                },
                searchroom: {
                    test: /search-room.js/,
                    name: 'search-room',
                    chunks: 'initial',
                    enforce: true,
                },
                roomdetails: {
                    test: /room-details.js/,
                    name: 'room-details',
                    chunks: 'initial',
                    enforce: true,
                },
                registration: {
                    test: /registration.js/,
                    name: 'registration',
                    chunks: 'initial',
                    enforce: true,
                },
                signin: {
                    test: /sign-in.js/,
                    name: 'sign-in',
                    chunks: 'initial',
                    enforce: true,
                }
            }
        }
        // {
        //     chunks: 'all'
        // }
    }

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders = (extra) => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true
            }
        }, 
        'css-loader'
    ]

    if (extra) {
        loaders.push(extra)
    }

    return loaders
}

module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry: {
        'colors-type': './colors-type.js',
        'form-elements': './form-elements.js',
        'cards': './cards.js',
        'headers-footers': './headers-footers.js',
        'landing-page': './landing-page.js',
        'search-room': './search-room.js',
        'room-details': './room-details.js',
        'registration': './registration.js',
        'sign-in': './sign-in.js',
    },
    output: {
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        // extensions: ['.js', '.scss'],
        alias: {
            '@pages': path.resolve(__dirname, 'src/pages'),
            '@blocks': path.resolve(__dirname, 'src/blocks'),
            '@style': path.resolve(__dirname, 'src/style'),
            '@img': path.resolve(__dirname, 'src/img'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    optimization: optimization(),
    // devtool: isDev ? 'source-map' : '',
    plugins: [
        // ...htmlWebpackPages,
        new HTMLWebpackPlugin({
            filename: 'colors-type.html',
            template: './pages/colors-type/colors-type.pug',
            chunks: ['colors-type']
            // minify: {                                   // для html
            //     collapseWhitespace: isProd
            // }
        }),
        new HTMLWebpackPlugin({
            filename: 'form-elements.html',
            template: './pages/form-elements/form-elements.pug',
            chunks: ['form-elements']
        }),
        new HTMLWebpackPlugin({
            filename: 'cards.html',
            template: './pages/cards/cards.pug',
            chunks: ['cards']
        }),
        new HTMLWebpackPlugin({
            filename: 'headers-footers.html',
            template: './pages/headers-footers/headers-footers.pug',
            chunks: ['headers-footers']
        }),
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './pages/landing-page/landing-page.pug',
            chunks: ['landing-page']
        }),
        new HTMLWebpackPlugin({
            filename: 'search-room.html',
            template: './pages/search-room/search-room.pug',
            chunks: ['search-room']
        }),
        new HTMLWebpackPlugin({
            filename: 'room-details.html',
            template: './pages/room-details/room-details.pug',
            chunks: ['room-details']
        }),
        new HTMLWebpackPlugin({
            filename: 'registration.html',
            template: './pages/registration/registration.pug',
            chunks: ['registration']
        }),
        new HTMLWebpackPlugin({
            filename: 'sign-in.html',
            template: './pages/sign-in/sign-in.pug',
            chunks: ['sign-in']
        }),
        new CleanWebpackPlugin(),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: './img/favicon.ico',
        //             to: path.resolve(__dirname, 'dist')
        //         }
        //     ]
        // }),
        new MiniCssExtractPlugin({
            filename: `style/${filename('css')}`
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
        hot: isDev,
        overlay: {
          warnings: true,
          errors: true,
        }
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: 'pug-loader',
                options: {                    
                    pretty: isDev
                }
            },
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/i,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                exclude: [
                    path.resolve(__dirname, './src/fonts'),
                    path.resolve(__dirname, './src/icons'),
                ],
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/images',
                        publicPath: '../assets/images',
                    }
                }
            },
            {
                test: /\.(woff2|woff|ttf|eot|svg)$/,
                include: [
                    path.resolve(__dirname, './src/fonts'),    // include - будет брать только из данных каталогов
                    path.resolve(__dirname, './src/icons'),
                    path.resolve(__dirname, 'node_modules'), // Для подключения шрифтов из пакетов если на них есть ссылка
                ],
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'assets/fonts',
                        publicPath: '../assets/fonts',
                    },
                },
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',                 //Может потребоваться добавление полифила
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}