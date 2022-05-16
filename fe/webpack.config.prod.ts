import MiniCssExtractPlugin from "mini-css-extract-plugin";
import merge from "webpack-merge";
import TerserPlugin from "terser-webpack-plugin";
import commonConfig from "./webpack.config";

const webpack = require("webpack");

export default merge(commonConfig, {
  mode: "production",
  optimization: {
    // minify code. also use parameters that improve build speed.
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: true,
      }),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    // fix "process is not defined" error:
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],
});
