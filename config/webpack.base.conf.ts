import * as path from 'path'
import * as webpack from 'webpack'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'

let filenameAsset
if (process.env.NODE_ENV === 'production') {
  filenameAsset = '[name]-[hash:16].[ext]'
} else {
  filenameAsset = '[name].[ext]'
}

let webpackConfig: webpack.Configuration = {
  context: path.resolve(__dirname, '../src'),
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.css', '.styl'],
    modules: [path.resolve(__dirname, "../src"), "node_modules"]
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: [{
        loader: 'ts-loader'
      }]
    }, {
      test: /\.(png|jpe?g|gif|ico|svg|ttf|eot|woff2?)$/,
      use: [{
        loader: 'url-loader',
        options: {
          name: filenameAsset,
          limit: 1000,
        },
      }]
    }, {
      test: /\.html$/,
      use: [{
        loader: "html-loader",
        options: {
          attrs: ["img:src", "link:href"],
        }
      }]
    }]
  },
  plugins: [
    // new webpack.ProvidePlugin({
    //   $: 'jquery'
    // }),
    new HtmlWebpackPlugin({
      template: './index.html',
      chunksSortMode: 'dependency',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        quoteCharacter: '"'
      },
    }),
  ]
}

export {webpackConfig}
