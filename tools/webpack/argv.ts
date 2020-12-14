import { resolvePath } from './util'
import { ENV, Argv, NODE_ENV } from './types'

function getPaths(env: ENV) {
  let hash = ''
  let chunkhash = ''
  if (env.NODE_ENV === NODE_ENV.PRODUCTION) {
    hash = '.[hash:8]'
    chunkhash = '.[chunkhash:8]'
  }

  return {
    publicPath: '/',
    output: resolvePath('dist'),
    main: resolvePath('src', 'bootstrap.tsx'),
    js: `js/[name]${chunkhash}.js`,
    css: `css/[name]${chunkhash}.css`,
    image: `image/[name]${hash}.[ext]`,
    font: `fonts/[name]${hash}.[ext]`,
    template: resolvePath('statics', 'index.html'),
  }
}

export default function getArgv(env: ENV): Argv {
  const defaultArgv = {
    localhost: '0.0.0.0',
    port: 8090,
  }

  const paths = getPaths(env)
  return { ...defaultArgv, ...env, paths }
}
