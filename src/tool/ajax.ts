import { ajax, AjaxError, AjaxRequest, AjaxResponse } from 'rxjs/ajax'
import { catchError, map } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs'
import { forIn } from 'lodash'

export default class BasicAjax {
  private host = ''

  private withCredentials = true

  private headers = {}

  constructor(host: string = '', headers = {}) {
    this.setHost(host)
    this.setHeaders(headers)
  }

  setHost(host: string) {
    this.host = this.compose(host, 'apps')
  }

  getHost() {
    return this.host
  }

  setHeaders(headers: object) {
    this.headers = headers
  }

  protected ajax(options: AjaxRequest): Observable<AjaxResponse> {
    if (options.headers) {
      this.setHeaders({ ...this.headers, ...options.headers })
    }
    return ajax({
      ...options,
      headers: this.headers,
      withCredentials: this.withCredentials,
      url: this.prefixApiHost(this.host, options.url!),
      crossDomain: true,
    }).pipe(
      map((value) => value.xhr.response.data),
      catchError((err: AjaxError) => throwError(err)),
    )
  }

  get(url: string, query = {}, options: AjaxRequest = {}) {
    const uri = this.buildQuery(url, query)
    return this.ajax({ url: uri, method: 'get', ...options })
  }

  post(url: string, body: Object, options?: AjaxRequest) {
    return this.ajax({ url, body, method: 'post', ...options })
  }

  put(url: string, query: Record<string, unknown>, body: Object) {
    const uri = this.buildQuery(url, query)
    return this.ajax({ url: uri, body, method: 'put' })
  }

  buildQuery(url: string, query: Record<string, unknown>) {
    const params = new URLSearchParams()
    forIn(query, (value, key) => params.set(key, `${value}`))
    const queryString = params.toString()
    return queryString ? `${url}?${queryString}` : url
  }

  protected compose = (path: string, ...tails: string[]) => {
    const formatedTails = tails.map((item) => {
      if (item.startsWith('/')) {
        return item.slice(1)
      }
      return item
    })
    if (path.endsWith('/')) {
      return `${path}${formatedTails.join('/')}`
    }
    return `${path}/${formatedTails.join('/')}`
  }

  protected prefixApiHost(host: string, url: string) {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url
    } if (host.endsWith('/') && url.startsWith('/')) {
      return `${host}${url.substr(1)}`
    } if (!host.endsWith('/') && !url.startsWith('/')) {
      return `${host}/${url}`
    }
    return `${host}${url}`
  }
}
