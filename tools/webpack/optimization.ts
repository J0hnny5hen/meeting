// eslint-disable-next-line import/no-extraneous-dependencies
import TerserPlugin from 'terser-webpack-plugin'
import CSSMinimizerPlugin from 'css-minimizer-webpack-plugin'
import { Configuration, WebpackPluginInstance } from 'webpack'
import { Argv, NODE_ENV } from './types'

export default function getOptimization(argv: Argv): Configuration['optimization'] {
  return {
    minimize: argv.NODE_ENV === NODE_ENV.PRODUCTION,
    minimizer: [
      /**
       * https://github.com/webpack-contrib/terser-webpack-plugin
       * This plugin uses terser to minify your JavaScript.
       */
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 5,
          },
          compress: {
            ecma: 5,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }) as unknown as WebpackPluginInstance,
      /**
       * https://github.com/webpack-contrib/css-minimizer-webpack-plugin
       * This plugin uses cssnano to optimize and minify your CSS.
       */
      new CSSMinimizerPlugin(),
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          name: 'vendor',
          enforce: true,
          reuseExistingChunk: true,
          priority: 90,
          test: /[\\/]node_modules[\\/]/,
        },
      },
    },
  }
}
