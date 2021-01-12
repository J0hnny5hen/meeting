export interface BasicConfig {
  REACT_APP_AGORA_APP_ID: string
  REACT_APP_AGORA_APP_TOKEN: string
  REACT_APP_AGORA_LOG: string
  REACT_APP_AGORA_RESTFULL_TOKEN: string
}

export const defaultConfig: Partial<BasicConfig> = {
  REACT_APP_AGORA_APP_ID: process.env.REACT_APP_AGORA_APP_ID,
  REACT_APP_AGORA_APP_TOKEN: process.env.REACT_APP_AGORA_APP_TOKEN,
  REACT_APP_AGORA_LOG: process.env.REACT_APP_AGORA_LOG,
  REACT_APP_AGORA_RESTFULL_TOKEN: process.env.REACT_APP_AGORA_RESTFULL_TOKEN,
}

// https://github.com/pouchdb/pouchdb/issues/8206
window.Buffer = require('buffer').Buffer

window.process = require('process')
