const path = require("path");

const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const webpack = require("webpack");

module.exports = {
  devServer: {
    disableHostCheck: true,
    hotOnly: true,
    historyApiFallback: true
  },
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "index.js",
    publicPath: "/"
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      filename: "./index.html"
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development"
    }),
    new Dotenv({
      path: process.env.NODE_ENV === "production" ? ".env.production" : ".env",
      systemvars: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin([{ from: "src/assets", to: "assets" }])
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: ["babel-loader", "aframe-super-hot-loader"]
      },
      {
        test: /\.html/,
        exclude: /(node_modules|index.html)/,
        use: [
          "aframe-super-hot-html-loader",
          {
            loader: "html-require-loader",
            options: {
              root: path.resolve(__dirname, "src")
            }
          }
        ]
      },
      {
        test: /\.glsl/,
        exclude: /(node_modules)/,
        loader: "webpack-glsl-loader"
      },
      {
        test: /\.png|\.jpg/,
        exclude: /(node_modules)/,
        use: ["url-loader"]
      }
    ]
  },
  resolve: {
    modules: [path.join(__dirname, "node_modules")]
  }
};
