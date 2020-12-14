import { Configuration } from 'webpack'
import { Argv } from './types'

export default function getOutput(argv: Argv): Configuration['output'] {
  return {
    filename: argv.paths.js,
    publicPath: argv.paths.publicPath,
    path: argv.paths.output,
  }
}
