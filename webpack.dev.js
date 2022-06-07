const path = require('path')
const {merge } = require('webpack-merge')
const common = require('./webpack.common.js')

const outputFile = '[name]'

const bsConf = {
  start: './dist/index.html'
}

module.exports = () => merge(common(outputFile), {
  mode: 'development',
  devtool: 'source-map',
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  plugins: [
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    host: "0.0.0.0",
    open: true,
    port: 8080
  },

  stats: {
    children: true,
    errorDetails: true
  }
  
})
