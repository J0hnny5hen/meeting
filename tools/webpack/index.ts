import fs from 'fs'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import getArgv from './argv'
import getDevtool from './devtool'
import getEntry from './entry'
import getOutput from './output'
import getRules from './rules'
import getOptimization from './optimization'
import getPlugins from './plugins'
import { fork, formatStats, resolvePath } from './util'
import { ENV, NODE_ENV } from './types'

const env = process.env as unknown as ENV

const argv = getArgv(env || {})

const config = {
  target: 'web',

  mode: argv.NODE_ENV,

  devtool: getDevtool(argv),

  entry: getEntry(argv),

  output: getOutput(argv),

  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
      '.styl',
      '.json',
    ],
    modules: [
      'node_modules',
    ],
    alias: {
      '@config': resolvePath('src/config'),
      '@apps': resolvePath('src/apps'),
      '@core': resolvePath('src/core'),
      '@declare': resolvePath('src/declare'),
      '@model': resolvePath('src/model'),
      '@proxy': resolvePath('src/proxy'),
      '@service': resolvePath('src/service'),
      '@tool': resolvePath('src/tool'),
      '@ui': resolvePath('src/ui'),
    },
    fallback: {
      assert: require.resolve('assert/'),
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer'),
      process: require.resolve('process'),
    },
  },

  module: { rules: getRules(argv) },

  plugins: getPlugins(argv),

  optimization: getOptimization(argv),
}

export default config

fork(
  argv.NODE_ENV === NODE_ENV.DEVELOPMENT,
  () => {
    // dev
    const server = new WebpackDevServer(
      webpack(config),
      { hot: true, historyApiFallback: true },
    )
    server.listen(argv.port)
  },
  () => {
    // build
    fs.rmdir(resolvePath('dist'), { recursive: true }, () => {
      webpack(config,
        (error, stats) => {
          if (error) {
            throw error
          }
          if (stats?.hasErrors()) {
            throw new Error('Build failed with errors')
          }
          console.info(formatStats(stats!, argv))
        })
    })
  },
)
