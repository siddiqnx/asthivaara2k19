const common = require("./webpack.common");
const merge = require("webpack-merge");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  mode: "development",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    chunkFilename: '[id].bundle.js',
  },
  module: {
    rules: [
      //SCSS
      {
        test:/\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
          {
            loader: "postcss-loader",
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              sourceMapContents: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "./index.html",
      chunks: ["index"]
    }),new HtmlWebpackPlugin({
      template: "./src/events.html",
      filename: "./events.html",
      chunks: ["events"]
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ],
  devServer: {
    host: '192.168.1.6',
    port: 9000,
    writeToDisk:true
  }
});