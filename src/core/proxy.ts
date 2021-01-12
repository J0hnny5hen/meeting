import { Loading, Processor } from '@service'
import { OperatorAPI } from '@proxy'
import { StorageAPI } from '@tool'

import { ajax } from './ajax'
import { error$ } from './event'

const loading = new Loading()
export const processor = new Processor(error$, loading)
export const operatorAPI = new OperatorAPI(ajax, loading, processor)
export const storageAPI = new StorageAPI()
