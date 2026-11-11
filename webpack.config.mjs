import path from "node:path";
import { fileURLToPath } from "node:url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import esbuildLoader from "esbuild-loader";

const { EsbuildPlugin } = esbuildLoader;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (env, argv) => {
  const isProd = argv.mode === "production";

  return {
    mode: argv.mode ?? "development",
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: isProd ? "[name].[contenthash].js" : "[name].js",
      assetModuleFilename: "assets/[name].[contenthash][ext]",
      clean: true,
    },
    devtool: isProd ? "source-map" : "eval-cheap-module-source-map",
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"],
    },
    optimization: {
      minimize: isProd,
      minimizer: [
        new EsbuildPlugin({ target: "es2015", minify: true, css: true }),
      ],
    },
    devServer: {
      static: path.resolve(__dirname, "dist"),
      port: 3000,
      open: false,
      hot: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
      ...(isProd
        ? [
            new MiniCssExtractPlugin({
              filename: "[name].[contenthash].css",
            }),
          ]
        : []),
    ],
    module: {
      rules: [
        {
          test: /\.module\.css$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  namedExport: false,
                  localIdentName: isProd
                    ? "[hash:base64:8]"
                    : "[name]__[local]--[hash:base64:5]",
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: [
            isProd ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
          ],
        },
        {
          test: /\.[jt]sx?$/,
          loader: "esbuild-loader",
          options: {
            target: "es2015",
          },
        },
      ],
    },
  };
};
