import { BasicAjax } from '@tool'
import { EMPTY, Observable } from 'rxjs'
import { uniqueId } from 'lodash'
import { MangoQuery } from 'rxdb'
import md5 from 'md5'
import { HttpMethod, AppId } from '@declare'
import { defaultConfig } from '@config'

export default class Operation<U, T> {
  id: string

  key: string

  url: string = ''

  header: object = {}

  body: object = {}

  isDelete?: boolean

  collectionName?: string

  query?: MangoQuery<T>

  before?: () => Observable<any>

  request$: Observable<U> = EMPTY

  after?: (response: U) => Observable<any>

  appId: AppId = defaultConfig.REACT_APP_AGORA_APP_ID as unknown as AppId

  constructor(protected ajax: BasicAjax) {
    this.id = uniqueId()
    this.key = this.id
  }

  protected generateKey(method?: HttpMethod) {
    this.key = md5(JSON.stringify({ url: this.url, body: this.body, method }))
  }
}
