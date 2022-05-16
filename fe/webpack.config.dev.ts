import merge from "webpack-merge";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

import commonConfig from "./webpack.config";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import * as webpack from "webpack";

export default merge(commonConfig, {
  mode: "development",
  plugins: [
    // new BundleAnalyzerPlugin(), //to analyze the bundle size, uncomment

    new MiniCssExtractPlugin({ filename: "[name].dev.css" }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
  ],

  output: {
    filename: "[name].dev.js",
  },
});
