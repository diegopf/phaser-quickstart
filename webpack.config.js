const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  devtool: "source-map",
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin(),
    new webpack.DefinePlugin({
      WEBGL_RENDERER: true,
      CANVAS_RENDERER: true
    }),
    new CopyWebpackPlugin([
      { context: "src/assets/", from: "*.png", to: "src/assets/" }
    ])
  ],
  module: {
    rules: [{ test: [/\.vert$/, /\.frag$/], use: "raw-loader" }]
  }
};
