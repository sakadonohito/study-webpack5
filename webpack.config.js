const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin')
const entries = WebpackWatchedGlobEntries.getEntries([path.resolve(__dirname, './src/js/**/*.js')],{
  ignore: path.resolve(__dirname, './src/js/**/_*.js')
})()
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
        '!fonts',
        '!images',
        '!js',
        '!css'
      ]
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
  devtool: 'eval-source-map'
})
