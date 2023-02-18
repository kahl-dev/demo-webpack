import RemoveEmptyScriptsPlugin from 'webpack-remove-empty-scripts';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import path from 'path';
import sass from 'sass';

module.exports = async (_, argv) => {
  return {
    mode: argv.mode,
    entry: {
      main: ['./src/entry.js', './assets/scss/entry.scss'],
      additional: './assets/scss/additional_file.scss'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      chunkFilename: `./[name].[contenthash].esm.js`,
      filename: `./[name].esm.js`,
      clean: true,
    },

    resolve: {
      alias: {
        SCSS: path.resolve(__dirname, 'assets/scss/'),
      }
    },

    plugins: [
      new RemoveEmptyScriptsPlugin(),
      /**
       * Doc: https://webpack.js.org/plugins/mini-css-extract-plugin/
       */
      new MiniCssExtractPlugin(),
    ],
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: "sass-loader",
              options: {
                implementation: sass,
              },
            },
          ],
        },
      ],
    },
  }
};
