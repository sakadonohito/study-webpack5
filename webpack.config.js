const fs = require('fs')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin')
//const entries = WebpackWatchedGlobEntries.getEntries([path.resolve(__dirname, './src/js/**/*.js')],{
//  ignore: [
//    path.resolve(__dirname, './src/js/**/_*.js'),
//    path.resolve(__dirname, './src/js/AppApp.js')
//  ]
//})()
const entries = WebpackWatchedGlobEntries.getEntries([
  path.resolve(__dirname, './src/ts/*.ts'),
  path.resolve(__dirname, './src/ts/*.tsx')
],{
  ignore: [
    path.resolve(__dirname, './src/ts/modules/*.*'),
    path.resolve(__dirname, './src/ts/components/*.*')
  ]
})()

const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlGlobPlugins = (entries, srcPath) => {
  return Object.keys(entries).filter( (key) => {
    return fs.existsSync(path.resolve(__dirname, `src/${srcPath}/${key}.html`))
  }).map( (key) => 
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: `${key}.html`,
      template: `${srcPath}/${key}.html`,
      chunks: [key]
    })
  );
};

const MiniCssExtractPlugin = require('mini-css-extract-plugin')

//const outputFile = '[name]'

module.exports = () => ({
  mode: process.env.NODE_ENV,
  context: `${__dirname}/src`,
  entry: entries,

  output: {
    path: path.join(__dirname, './dist'),
    filename: `./js/[name].js`,
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [require('autoprefixer')({grid: true})]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        generator: {
          filename: `images/[name].[contenthash][ext]`
        },
        type: 'asset/resource'
      },      
      {
        test: /\.tsx?$/,
        use: "ts-loader"
      }
    ]
  },
  plugins: [
    new WebpackWatchedGlobEntries(),
    new CleanWebpackPlugin({
      //dry: true,
      verbose: true,
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        '!.gitkeep',
        '!fonts',
        '!images',
        '!js',
        '!css'
      ]
    }),
    new MiniCssExtractPlugin({
      filename: './css/[name].css'
    }),
/*
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index_sample.html',
      template: './html/index.html', //context is src
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'another_sample.html',
      template: './html/another.html', //context is src
      chunks: ['another']
    }),
*/
    ...htmlGlobPlugins(entries, './templates')
  ],
  resolve: {
    extensions: [".ts",".tsx",".js",".json"],
    alias: {
      '@image': path.resolve(__dirname, './src/images/')
    }
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    host: "0.0.0.0",
    open: true,
    port: 8080
  },
  devtool: 'eval-source-map',
  stats: {
    children: true,
    errorDetails: true
  },
  target: 'web'
})
