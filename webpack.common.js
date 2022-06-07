const fs = require('fs')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts')
const TerserPlugin = require('terser-webpack-plugin')
const WebpackWatchedGlobEntries = require('webpack-watched-glob-entries-plugin')
const entries = WebpackWatchedGlobEntries.getEntries([
  //path.resolve(__dirname, './src/ts/**/*.ts'),
  //path.resolve(__dirname, './src/ts/*.ts'),
  //path.resolve(__dirname, './src/ts/*.tsx')
  path.resolve(__dirname, './src/ts/index.tsx'),
  path.resolve(__dirname, './src/ts/another.ts'),
  path.resolve(__dirname, './src/css/style.css')
],{
  ignore: [
    path.resolve(__dirname, './src/ts/modules/*.*'),
    path.resolve(__dirname, './src/ts/components/*.*')
  ]
})()

const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlGlobPlugins = (entries, srcPath) => {

  return Object.keys(entries).filter( (key) => {
    return fs.existsSync(path.resolve(__dirname, `src/${srcPath}/${key}.ejs`))
  }).map( (key) => 
    new HtmlWebpackPlugin({
      inject: 'body',
      minify: false,
      filename: `${key}.html`,
      template: `${srcPath}/${key}.ejs`,
      chunks: [key,'style']
    })
  );
};
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const lintOptions = {
  // FYI: https://webpack.js.org/plugins/eslint-webpack-plugin/
}

module.exports = (outputFile) => ({
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
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
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
        test: /\.(png|jpe?g|gif|svg)$/i,
        generator: {
          filename: `images/[name].[contenthash][ext]`
        },
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024 //20KB
          }
        }
      },      
      {
        test: /\.(ttf|otf|eot|woff|woff2)$/i,
        generator: {
          filename: `fonts/[name][ext]`
        },
        type: 'asset/resource'
      },
      {
        test: /\.html$/i,
        loader: 'html-loader'
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader"
      }
    ]
  },

  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false
      })
    ],
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendor: {
          test: /node_modules/i,
          name: 'vendor'
        },
        vendorsModules: {
          test: /src[\\/](js|ts)[\\/]modules/i,
          name: 'vendor-modules',
          minSize: 0,
          minChunks: 2
        }
      }
    }
  },
  
  performance: {
    hints: false
  },

  plugins: [
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
    new WebpackWatchedGlobEntries(),
    new RemoveEmptyScriptsPlugin(),
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
    ...htmlGlobPlugins(entries, './templates'),
    new MiniCssExtractPlugin({
      filename: './css/[name].css'
    }),
    new ESLintPlugin(lintOptions)
  ],

  resolve: {
    extensions: [".ts",".tsx",".js",".json"],
    alias: {
      '@image': path.resolve(__dirname, './src/images'),
      '@font': path.resolve(__dirname, './src/fonts')
    }
  },

  target: 'web'
})
