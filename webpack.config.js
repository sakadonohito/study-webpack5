const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin')
const entries = WebpackWatchedGlobEntries.getEntries([path.resolve(__dirname, './src/js/**/*.js')],{
  ignore: [
    path.resolve(__dirname, './src/js/**/_*.js'),
    path.resolve(__dirname, './src/js/AppApp.js')
  ]
})()
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
  plugins: [
    new WebpackWatchedGlobEntries(),
    new CleanWebpackPlugin({
      //dry: true,
      verbose: true,
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        '!index.html',
        '!index_sample.html',
        '!another.html',
        '!fonts',
        '!images',
        '!js',
        '!css'
      ]
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'index_sample.html',
      template: './html/index.html', //context is src
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      inject: 'body',
      filename: 'another.html',
      template: './html/another.html', //context is src
      chunks: ['another']
    })
  ],
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
    children: true
  }
})
