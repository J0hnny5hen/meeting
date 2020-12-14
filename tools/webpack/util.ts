import fs from 'fs'
import path from 'path'
import zlib from 'zlib'
import chalk from 'chalk'
import { Stats } from 'webpack'
import { noop } from 'lodash'
import { Argv } from './types'

const ui = require('cliui')({ width: process.stdout.columns || 80 })

export function resolvePath(...pathFragments: string[]) {
  return path.resolve(__dirname, '..', '..', ...pathFragments)
}

export function fork(condition: boolean, truthy: Function, falsy?: Function) {
  if (condition) {
    return truthy()
  }
  return falsy ? falsy() : noop()
}

type Asset = {
  name: string,
  size: number,
  [key: string]: unknown
}

type StatsJson = {
  assets: Asset[]
  children?: [
    {
      assets: Asset[]
    }
  ]
}

export function formatStats(stats: Stats, argv: Argv) {
  const json: StatsJson = stats.toJson({
    hash: false,
    modules: false,
    chunks: false,
  })
  let assets = json.assets
    ? json.assets
    : json.children?.reduce((acc, child) => acc.concat(child.assets), [] as Asset[])

  const seenNames = new Map()
  const isJS = (val: string) => /\.js$/.test(val)
  const isCSS = (val: string) => /\.css$/.test(val)
  const isMinJS = (val: string) => /\.min\.js$/.test(val)

  assets = assets?.map((a) => ({
    ...a,
    name: a.name.split('?')[0],
  }))
    .filter((a) => {
      if (seenNames.has(a.name)) {
        return false
      }
      seenNames.set(a.name, true)
      return isJS(a.name) || isCSS(a.name)
    })
    .sort((a, b) => {
      if (isJS(a.name) && isCSS(b.name)) return -1
      if (isCSS(a.name) && isJS(b.name)) return 1
      if (isMinJS(a.name) && !isMinJS(b.name)) return -1
      if (!isMinJS(a.name) && isMinJS(b.name)) return 1
      return b.size - a.size
    })

  function formatSize(size: number) {
    return `${(size / 1024).toFixed(2)} KiB`
  }

  function makeRow(a: string, b: string, c: string) {
    return `  ${a}\t    ${b}\t ${c}`
  }

  function getGzippedSize(asset: Asset) {
    const filepath = path.join(path.resolve(argv.paths.output, asset.name))
    const buffer = fs.readFileSync(filepath)
    return formatSize(zlib.gzipSync(buffer).length)
  }

  ui.div(
    `${makeRow(
      chalk.cyan.bold('File'),
      chalk.cyan.bold('Size'),
      chalk.cyan.bold('Gzipped'),
    )}\n\n${
      assets?.map((asset: Asset) => makeRow(
        /js$/.test(asset.name)
          ? chalk.green(path.join(asset.name))
          : chalk.blue(path.join(asset.name)),
        formatSize(asset.size),
        getGzippedSize(asset),
      )).join('\n')}`,
  )

  return `${ui.toString()}\n\n  ${chalk.gray('Images and other types of assets omitted.')}\n`
}
