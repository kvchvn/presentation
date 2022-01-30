const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CSSMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[hash][ext][query]'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [
      new TerserWebpackPlugin(),
      new CSSMinimizerWebpackPlugin()
    ]
  },
  devServer: {
    port: 4200,
    hot: isDev
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: true,
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'assets'),
          to: path.resolve(__dirname, 'dist', 'assets')
        },
      ]
    }),
    new MiniCSSExtractPlugin({
      filename: 'main.css'
    }),
    new ESLintPlugin({
      files: 'src/**/*.js',
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCSSExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.svg$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/svg/[name][ext][query]'
        }
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext][query]'
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ]
          }
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-typescript'
            ]
          }
        }
      }
    ]
  }
}