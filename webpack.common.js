const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.js",
    events: "./src/events_entry.js",
    juniors: "./src/juniors_entry.js"
  },
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
            loader: "html-loader",
            options: {
              attrs: ['img:data-lazy', 'img:src']
            }
          }
        ]
      },
      //File Loader
      {
        test: /\.(png|svg|jpe?g|gif|ico|webp)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: "[name].[ext]",
              outputPath: 'images'
            }
          }
        ]
      },
      {
        test: /_headers/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '_headers'
            }
          }
        ]
      },
      //Font Loader
      {
        test: /\.(ttf|eot|woff|woff2|otf)$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: 'fonts'
          },
        },
      },
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
  ]
}