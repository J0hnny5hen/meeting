import { ajax } from 'rxjs/ajax'

class BasicAjax {
  host: string = ''

  constructor(private prefix? = '') {
  }

  setHost(host: string) {
    this.host = host
  }

  getHost() {
    return this.host
  }

  protected ajax() {
    return fromAjax()
  }
}
