const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const autoprefixer = require("autoprefixer");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      //Babel
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      //HTML Loader
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          
        ]
      },
      //File Loader
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "[name].[ext]",
              outputPath: 'images',
            }
          }
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
  ],

  devServer: {
    port: 9000,
    writeToDisk:true
  }
}