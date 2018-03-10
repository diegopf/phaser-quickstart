const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.DefinePlugin({
      WEBGL_RENDERER: true,
      CANVAS_RENDERER: true
    })
  ],
  module: {
    rules: [{ test: [/\.vert$/, /\.frag$/], use: "raw-loader" }]
  }
};
