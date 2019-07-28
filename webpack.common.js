const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/index.js",
    events: "./src/events_entry.js"
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
            loader: "html-loader"
          }
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
              outputPath: 'images'
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