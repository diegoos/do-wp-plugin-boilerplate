const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const globCssImporter = require('node-sass-glob-importer');
const StylelintPlugin = require('stylelint-webpack-plugin');

const path = require('path');

module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production';

  return {
    mode: devMode ? 'development' : 'production',

    performance: {
      hints: 'warning',
    },

    optimization: {
      minimize: devMode ? false : true,
      minimizer: [
        new TerserPlugin(),
        new OptimizeCssAssetsPlugin({
          cssProcessorPluginOptions: {
            preset: ['default', { discardComments: { removeAll: true } }],
          },
          canPrint: true,
        }),
      ],
    },

    entry: ['./assets/javascript/main.js', './assets/sass/main.scss'],

    output: {
      filename: devMode ? 'main.js' : 'main-[contenthash].js',
      filename: 'dist.min.js',
      path: path.resolve(__dirname, 'dist'),
      sourceMapFilename: '[file].map',
    },

    resolve: {
      symlinks: true,
      modules: [
        path.resolve(__dirname, 'vendor'),
        path.resolve(__dirname, 'assets/javascript'),
        path.resolve(__dirname, 'source/scripts'),
        'node_modules',
      ],
      alias: {
        '@vendor': path.resolve(__dirname, 'vendor'),
        '@scripts': path.resolve(__dirname, 'assets/javascript'),
        '@style': path.resolve(__dirname, 'assets/stylesheet'),
      },
    },

    devtool: devMode ? 'source-map' : false,

    module: {
      rules: [
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: devMode ? true : false,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: devMode ? true : false,
                sassOptions: {
                  importer: globCssImporter(),
                },
              },
            },
          ],
        },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: devMode ? 'main.css' : 'main-[contenthash].css',
        chunkFilename: '[id].css',
      }),
      new ManifestPlugin({
        fileName: 'assets-manifest.json',
      }),
      new StylelintPlugin(),
    ],
  };
};
