const webpack = require('webpack')
const path = require('path')
const { resolve } = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: {
    index: './src/pages/index/page.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: './',
    filename: 'js/[name].[hash].js'
  },
  resolve: {
    modules: [
      resolve('client'),
      'node_modules'
    ],
    extensions: ['.js', '.vue', '.json', 'scss']
  },
	module: {
    rules: [
      {
        test: /\.vue?$/,
        // loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/,
        loader: 'vue-loader'
      },
      {
        test: /\.(css|scss)$/,
        loader:"style-loader!css-loader!sass-loader"
      },
      {
        test: /\.css$/,
        include: /client/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [
            {
              loader: 'css-loader',
              query: {
                modules: true,
                sourceMap: true,
                importLoaders: 1,
                localIdentName: '[local]_[hash:base64:5]'
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        })
      },
      {
        test: /\.css$/,
        exclude: /client/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: {
            loader: 'css-loader'
          }
        })
      },
      {
        test: /\.vue?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(ttf|eot|otf|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        include: /client\/resources\/fonts/,
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.(ico|png|jpg|svg)$/,
        include: /client\/resources\/images/,
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: 'images/[name].[ext]?v=[hash:base64:5]'
        }
      },
      {
        test: /\.svg$/,
        include: /client\/resources\/icons/,
        loaders: [
          'babel-loader',
          'svg-react-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: resolve('./'),
      verbose: true,
      compress: { warnings: false },
      output: { comments: false }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'commons',
      filename: 'js/lib/commons.[hash].min.js',
    }),
    new HtmlWebpackPlugin({
      title: '首页',
      filename: 'index.html',
      template: 'src/pages/index/page.html',
      chunks: ['index', 'commons'],
      inject: true,
      hasg: true,
      minify:{
          removeAttributeQuotes: true,
          removeComments:false,    
          collapseWhitespace:false  
      }
    })
  ]
}