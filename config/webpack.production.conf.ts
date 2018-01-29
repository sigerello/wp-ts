import * as path from 'path'
import * as dotenv from 'dotenv-safe'

const pathEnv = path.resolve(__dirname, '../.env.production')
dotenv.load({path: pathEnv})

import * as webpack from 'webpack'
import * as merge from 'webpack-merge'
import * as DotenvWebpack from 'dotenv-webpack'
import * as CleanWebpackPlugin from 'clean-webpack-plugin'
// import * as CopyWebpackPlugin from 'copy-webpack-plugin'
import * as ExtractTextPlugin from 'extract-text-webpack-plugin'
import {Plugin as ShakePlugin} from 'webpack-common-shake'
import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin'
// import * as WebpackChunkHash from 'webpack-chunk-hash'
// import * as ChunkManifestPlugin from 'chunk-manifest-webpack-plugin'

import {webpackConfig as webpackConfigBase} from './webpack.base.conf'

const config = {
  dist: '../dist'
}

const filenameJS = '[name]-[chunkhash:16].js'
const filenameCSS = '[name]-[contenthash:16].css'

const rulesCSS = [
  {
    loader: 'css-loader',
    options: {
      discardComments: {
        removeAll: true,
      }
    },
  },
  {loader: 'postcss-loader'},
  {loader: 'stylus-loader'},
]

let webpackConfig: webpack.Configuration = merge(webpackConfigBase, {
  entry: {
    // vendor: [
    //   //vendor modules here
    // ],
    app: [
      './index.styl',
      './index.tsx'
    ]
  },
  output: {
    path: path.resolve(__dirname, config.dist),
    publicPath: '/',
    filename: filenameJS,
    chunkFilename: filenameJS,
    // library: ['my', 'namespace'],
    // libraryTarget: 'umd',
  },
  module: {
    rules: [{
      test: /\.styl$/,
      use: ExtractTextPlugin.extract({use: rulesCSS}),
    }]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new CleanWebpackPlugin([config.dist], {
      verbose: true,
    }),
    // new CopyWebpackPlugin([{
    //   from: 'mocks',
    //   to: 'mocks',
    // }]),
    new DotenvWebpack ({
      path: pathEnv
    }),
    new ExtractTextPlugin(filenameCSS),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ShakePlugin(),
    new UglifyJsPlugin({
      parallel: true,
      cache: true,
      uglifyOptions: {
        ecma: 5,
        comments: false,
        compress: {
          warnings: true,
          dead_code: true,
        },
      },
    }),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: ["vendor", "manifest"],
    //   minChunks: Infinity,
    // }),
    // new webpack.HashedModuleIdsPlugin(),
    // new WebpackChunkHash(),
    // new ChunkManifestPlugin({
    //   filename: "chunk-manifest.json",
    //   manifestVariable: "webpackManifest",
    //   inlineManifest: false,
    // }),
  ],
})

export default webpackConfig
