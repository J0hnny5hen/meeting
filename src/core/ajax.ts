import { BasicAjax } from '@tool'
import { defaultConfig } from '@config'

const httpHeader = {
  Authorization: `Basic ${defaultConfig.REACT_APP_AGORA_RESTFULL_TOKEN?.replace(/basic\s+|basic/i, '')}`,
  'Content-Type': 'application/json',
}

export const ajax = new BasicAjax(process.env.REACT_APP_AGORA_EDU_ENDPOINT_PREFIX, httpHeader)
