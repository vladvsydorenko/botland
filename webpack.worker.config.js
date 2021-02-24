const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/worker.ts",
  output: {
    filename: "worker.js",
    path: path.resolve(__dirname, "dist"),
    library: "test_worker",
    libraryTarget: "umd",
  },

  target: "web",
  mode: "development",
  devtool: "inline-source-map",

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      }
    ],
  },

  resolve: {
    extensions: [ ".ts", ".js" ],
  },
};