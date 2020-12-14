import { Entry } from 'webpack'
import { Argv } from './types'

export default function getEntry(argv: Argv): Entry {
  return { main: argv.paths.main }
}
