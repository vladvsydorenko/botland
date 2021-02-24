const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    library: "botcolony",
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

  plugins: [new HtmlWebpackPlugin({
    template: "src/index.html"
  })]
};