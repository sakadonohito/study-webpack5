const path = require('path')

module.exports = {
  mode: process.env.NODE_ENV,
  context: `${__dirname}/src`,
  entry: path.join(__dirname, '/src/js', 'index.js'),

  output: {
    path: path.join(__dirname, '/dist/js'),
    filename: 'main.js',
    publicPath: ''
  },
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
