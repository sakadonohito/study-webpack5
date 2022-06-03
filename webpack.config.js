const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: process.env.NODE_ENV,
  context: `${__dirname}/src`,
  entry: {
    index: path.join(__dirname, '/src/js', 'index.js'),
    app: path.join(__dirname, '/src/js', 'App.js')
  },

  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'js/[name].main.js',
    publicPath: ''
  },
  plugins: [
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
}
