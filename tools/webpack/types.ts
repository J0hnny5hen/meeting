export enum NODE_ENV {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production'
}

export type ENV = {
  NODE_ENV: NODE_ENV,
  sourcemap?: string,
  analyze?: boolean,
}

export enum PATHS {
  PUBLICPATH = 'publicPath',
  MAIN = 'main',
  JS = 'js',
  CSS = 'css',
  IMAGE = 'image',
  FONT = 'font',
  OUTPUT = 'output',
  TEMPLATE = 'template'
}

export type Argv = {
  localhost: string
  port: number
  paths: {
    [key in PATHS]: string
  }
} & ENV
