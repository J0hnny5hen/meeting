import { Observable, Subscription, Subject, of, throwError, from } from 'rxjs'
import { concatMap, mapTo, tap, catchError, finalize, share } from 'rxjs/operators'
import { MangoQuery, RxDatabase } from 'rxdb'
import { find, forEach } from 'lodash'

import { Loading } from './Loading'

export interface Operation<U> {
  id: string,
  key: string,
  isDelete?: boolean
  collectionName?: string
  query?: MangoQuery
  before?: () => Observable<any>,
  request$: Observable<U>,
  after?: (response: U) => Observable<any>,
}

export enum OperationLevel {
  normal = 0,
  high = 1,
}

export default class Processor {
  private limit = 6

  private highQueue: Operation<any>[] = []

  private normalQueue: Operation<any>[] = []

  private requestingMap = new Map<string, Subscription>()

  private handledRequestMap = new Map<string, Operation<any>>()

  private database: RxDatabase | null = null

  constructor(private errorHandler: Subject<Error>, private loading: Loading) {}

  setDatabase(database: RxDatabase) {
    this.database = database
  }

  add(operation: Operation<any>, level: OperationLevel = OperationLevel.high) {
    const request$ = this.handleRequest(operation)
    const handledOperation = {
      id: operation.id,
      key: operation.key,
      before: operation.before,
      request$,
      after: operation.after,
    }

    if (level === OperationLevel.high) {
      this.highQueue.push(handledOperation)
    } else {
      this.normalQueue.push(handledOperation)
    }

    this.checkToApply()
  }

  handleRequest<R>(request: Operation<R>): Observable<R> {
    let request$: Observable<R>
    const handledRequest = this.findHandledRequest(request.key)
    if (handledRequest) {
      request$ = handledRequest.request$
    } else {
      request$ = this.createRequest(request)
      this.handledRequestMap.set(request.id, {
        id: request.id,
        key: request.key,
        request$,
      })
    }

    this.loading.setPending(request.id)
    return request$.pipe(
      catchError((err: Error) => throwError(err)),
      tap(
        (resp) => this.loading.setSuccess(request.id, resp),
        (err) => this.loading.setFailure(request.id, err),
      ),
      finalize(() => this.loading.remove(request.id)),
    )
  }

  private createRequest<R>(request: Operation<R>) {
    return request.request$.pipe(
      concatMap((response) => {
        if (request.collectionName && request.isDelete && this.database) {
          const delete$ = this.database[request.collectionName!].find().$
          return delete$.pipe(mapTo(response))
        }
        if (request.collectionName && response && this.database) {
          const upsert$ = from(this.database[request.collectionName!].upsert(response))
          return upsert$.pipe(
            mapTo(response),
          )
        }
        return mapTo(response)
      }),
      tap(() => this.handledRequestMap.delete(request.id)),
      share(),
    )
  }

  remove(id: string) {
    this.loading.remove(id)
    this.handledRequestMap.delete(id)

    const subscription = this.requestingMap.get(id)
    if (subscription) {
      this.requestingMap.delete(id)
      subscription.unsubscribe()
    }

    this.highQueue = this.highQueue.filter((item) => item.id !== id)
    this.normalQueue = this.normalQueue.filter((item) => item.id !== id)

    this.checkToApply()
  }

  private checkToApply() {
    if (this.highQueue.length) {
      this.applyHighOperation()
    }

    if (this.normalQueue.length && this.requestingMap.size < this.limit) {
      this.applyNormalOperation()
    }
  }

  private applyHighOperation() {
    const currentStack = this.highQueue
    this.highQueue = []

    forEach(currentStack, (highOperation) => {
      this.requestOperation(highOperation)
    })
  }

  private applyNormalOperation() {
    const restSize = this.limit - this.requestingMap.size

    let restOperations: Operation<any>[]
    if (restSize < this.normalQueue.length) {
      restOperations = this.normalQueue.splice(0, restSize)
    } else {
      restOperations = this.normalQueue
      this.normalQueue = []
    }

    forEach(restOperations, (normalOperation) => {
      this.requestOperation(normalOperation)
    })
  }

  private requestOperation(operation: Operation<any>) {
    const before$ = operation.before ? operation.before() : of(null)
    const request$ = before$
      .pipe(
        concatMap(() => operation.request$),
      )
    const after$ = request$.pipe(
      concatMap((response) => {
        if (operation.after) {
          return operation.after(response).pipe(mapTo(response))
        }
        return of(response)
      }),
    )

    const subscription = after$.subscribe(({
      error: (error) => {
        this.errorHandler.next(error)
        this.checkToApply()
      },
      complete: () => {
        this.requestingMap.delete(operation.id)
        this.checkToApply()
      },
    }))
    this.requestingMap.set(operation.id, subscription)
  }

  private findHandledRequest(key: string) {
    const requests = Array.from(this.handledRequestMap.values())
    return find(requests, (request) => request.key === key) || null
  }
}
