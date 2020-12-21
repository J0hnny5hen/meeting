import { RuleSetRule } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import { concat } from 'lodash'
import { Argv, NODE_ENV } from './types'

function getTsRules(): RuleSetRule[] {
  return [
    {
      test: /\.tsx?$/,
      enforce: 'pre',
      exclude: [/node_modules/],
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
            plugins: [
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              ['@babel/plugin-proposal-class-properties', { loose: true }],
              ['@babel/plugin-transform-runtime', { regenerator: true }],
            ],
          },
        },
      ],
    },
  ]
}

function getStyleLoaders(argv: Argv) {
  return [
    argv.NODE_ENV === NODE_ENV.PRODUCTION ? {
      loader: MiniCssExtractPlugin.loader,
      options: { publicPath: argv.paths.publicPath },
    } : { loader: 'style-loader' },
    {
      loader: 'css-loader',
      options: { sourceMap: argv.NODE_ENV === NODE_ENV.DEVELOPMENT },
    },
    {
      loader: 'postcss-loader',
      options: { sourceMap: argv.NODE_ENV === NODE_ENV.DEVELOPMENT },
    },
  ]
}

function getCSSRules(argv: Argv) {
  return [
    {
      test: /\.css$/,
      use: getStyleLoaders(argv),
    },
  ]
}

function getStylusRules(argv: Argv) {
  return [
    {
      test: /\.styl$/,
      use: [
        ...getStyleLoaders(argv),
        {
          loader: 'stylus-loader',
          options: {
            sourceMap: !!argv.sourcemap,
            // import: [],
          },
        },
      ],
    },
  ]
}

function getFileRules(argv: Argv) {
  return [
    {
      test: /\.(gif|png|jpe?g)$/i,
      use: [{
        loader: 'url-loader',
        options: {
          name: argv.paths.image,
          limit: 2 * 1024,
        },
      }],
    },
    {
      test: /\.woff((\?|#)[?#\w\d_-]+)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 100,
          minetype: 'application/font-woff',
          name: argv.paths.font,
        },
      }],
    },
    {
      test: /\.woff2((\?|#)[?#\w\d_-]+)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 100,
          minetype: 'application/font-woff2',
          name: argv.paths.font,
        },
      }],
    },
    {
      test: /\.ttf((\?|#)[?#\w\d_-]+)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 100,
          minetype: 'application/octet-stream',
          name: argv.paths.font,
        },
      }],
    },
    {
      test: /\.eot((\?|#)[?#\w\d_-]+)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 100,
          name: argv.paths.font,
        },
      }],
    },
  ]
}

export default function getRules(argv: Argv): RuleSetRule[] {
  return concat(
    getTsRules(),
    getCSSRules(argv),
    getStylusRules(argv),
    getFileRules(argv),
  )
}
