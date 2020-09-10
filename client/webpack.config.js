const path = require('path');
// const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');

const modeConfig = (env) => require(`./build-utils/webpack.${env}`)(env);

module.exports = ({ mode, presets } = { mode: 'production', presets: [] }) => {
  return webpackMerge(
    {
      entry: './src/index.ts',
      mode,
      devtool: 'source-map',
      module: {
        rules: [
          {
            test: /\.js$/,
            use: ['source-map-loader'],
            enforce: 'pre',
          },
          {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.(png|jpg|bmp)$/,
            use: [
              {
                loader: 'file-loader',
                options: {
                  emitFile: true,
                },
              },
            ],
          },
        ],
      },
      resolve: {
        extensions: ['.tsx', '.ts', '.js'],
      },
      output: {
        filename: '[name].js',
        sourceMapFilename: '[file].map',
        path: path.resolve(__dirname, 'dist'),
      },
      optimization: {
        minimize: false,
        usedExports: true,
        splitChunks: {
          chunks: 'all',
        },
      },
      node: {
        __dirname: true,
        __filename: true,
      },
      plugins: [
        new CleanWebpackPlugin({}),
        new HtmlWebPackPlugin({
          title: 'A Mongus',
        }),
      ],
    },
    modeConfig(mode),
  );
};
