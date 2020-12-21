import { Observable, throwError } from 'rxjs'
import { map, catchError } from 'rxjs/operators'
import { ajax, AjaxError, AjaxRequest, AjaxResponse } from 'rxjs/ajax'

export default class BasicAjax {
  private host: string = ''

  private withCredentials: boolean = true

  setHost(host: string) {
    this.host = host
  }

  getHost() {
    return this.host
  }

  getWithCredentials() {
    return this.withCredentials
  }

  protected ajax(url: string): Observable<AjaxResponse | AjaxError>
  protected ajax(url: string, options?: Partial<AjaxRequest>): Observable<AjaxResponse | AjaxError>
  protected ajax(url: string, options?: Partial<AjaxRequest>, body?: unknown): Observable<AjaxResponse | AjaxError> {
    return ajax({ url, ...options, body }).pipe(
      map((resp) => resp),
      catchError((err) => {
        throwError(new Error(err))
      }),
    )
  }

  get(url: string, options?: Partial<AjaxRequest>) {
    return this.ajax(url, { ...options, withCredentials: this.withCredentials, method: 'GET' })
  }

  post(url: string, options?: Partial<AjaxRequest>, body?: unknown) {
    return this.ajax(url, { ...options, withCredentials: this.withCredentials, method: 'POST', body })
  }
}
