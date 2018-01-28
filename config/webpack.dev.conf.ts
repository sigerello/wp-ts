import * as path from 'path'
import * as dotenv from 'dotenv-safe'

const pathEnv = path.resolve(__dirname, '../.env.dev')
dotenv.load({path: pathEnv})

import * as webpack from 'webpack'
import * as merge from 'webpack-merge'
import * as DotenvWebpack from 'dotenv-webpack'

import {config as configBase} from './webpack.base.conf'

const filenameJS = '[name].js'

const rulesCSS = [
  {loader: 'style-loader'},
  {loader: 'css-loader'},
  {
    loader: 'postcss-loader',
    options: {
      sourceMap: true
    },
  },
  {loader: 'stylus-loader'}
]

let config: webpack.Configuration = merge(configBase, {
  entry: {
    app: [
      './index.styl',
      './index.tsx'
    ]
  },
  output: {
    publicPath: '/',
    filename: filenameJS,
    chunkFilename: filenameJS,
  },
  module: {
    rules: [{
      test: /\.styl$/,
      use: rulesCSS,
    }]
  },
  devtool: 'inline-source-map',
  devServer: {
    host: process.env.HOST,
    port: process.env.PORT,
    disableHostCheck: true,
    historyApiFallback: {
      disableDotRule: true,
    },
    noInfo: true,
    contentBase: path.resolve(__dirname, "../src")
  },
  performance: {
    hints: false,
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: true
    }),
    new webpack.NamedModulesPlugin(),
    new DotenvWebpack({
      path: pathEnv
    }),
  ],
})

export default config
