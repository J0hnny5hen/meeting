import store, { StoreAPI as Store } from 'store2'
import { BehaviorSubject, Observable } from 'rxjs'
import { distinctUntilChanged } from 'rxjs/operators'
import { isEqual } from 'lodash'

export class StorageAPI {
  private static localMap = new Map<string, BehaviorSubject<any>>()
  private static sessionMap = new Map<string, BehaviorSubject<any>>()
  private map: Map<string, BehaviorSubject<any>>
  private storage: Store | null = null
  private useSession: boolean
  private namespace = ''
  constructor(useSession?: boolean, namespace?: string)
  constructor(namespace: string)
  constructor(first?: boolean | string, second?: string) {
    let useSession = false
    let namespace = ''
    if (typeof first === 'boolean') {
      useSession = true
      namespace = second || ''
    } else if (typeof first === 'string') {
      namespace = first
    }
    this.useSession = useSession
    this.map = useSession ? StorageAPI.sessionMap : StorageAPI.localMap
    this.init(namespace)
  }

  get<T>(key: string): T | null {
    return this.storage && this.storage.get(key)
  }

  get$<T>(key: string): Observable<T|null> {
    const keyWithNs = this.namespace ? `${this.namespace}.${key}` : `${key}`
    let val$: Observable<T | null>
    if (this.map.has(keyWithNs)) {
      val$ = this.map.get(keyWithNs)!
    } else {
      const subject = new BehaviorSubject<T | null>(this.get<T>(keyWithNs))
      this.map.set(keyWithNs, subject)
      val$ = subject
    }
    return val$.pipe(distinctUntilChanged((x, y) => !isEqual(x, y)))
  }

  set(key: string, value: any) {
    if (!this.storage) {
      return
    }
    this.storage.set(key, value)
    const keyWithNs = this.namespace ? `${this.namespace}.${key}` : `${key}`
    if (this.map.has(keyWithNs)) {
      this.map.get(keyWithNs)!.next(value)
    }
  }

  clearAll() {
    // eslint-disable-next-line no-unused-expressions
    this.storage && this.storage.clearAll()
    this.map.clear()
  }

  private init(namespace: string) {
    let storeInstance = this.useSession ? store.session : store.local
    storeInstance = namespace ? storeInstance.namespace(namespace) : storeInstance
    this.storage = storeInstance
    this.namespace = namespace
  }
}
