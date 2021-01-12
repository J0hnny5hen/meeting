import { BehaviorSubject } from 'rxjs'
import shallowequal from 'shallowequal'
import { LoadingStatus, LoadingState } from '@declare'
import { distinctUntilChanged } from 'rxjs/operators'

export class Loading {
  private loadingMap = new Map<string, LoadingState>()

  private loadingObservable = new Map<string, BehaviorSubject<LoadingState | null>>()

  get(id: string) {
    return this.loadingMap.get(id)
  }

  get$(id: string) {
    let subject = this.loadingObservable.get(id)

    if (!subject) {
      subject = new BehaviorSubject(this.get(id) || null)
      this.loadingObservable.set(id, subject)
    }

    return subject.pipe(distinctUntilChanged((x, y) => shallowequal(x, y)))
  }

  setPending(id: string) {
    this.set(id, { status: LoadingStatus.pending })
  }

  setSuccess(id: string, response: any) {
    this.set(id, { status: LoadingStatus.success, response })
  }

  setFailure(id: string, error: Error) {
    this.set(id, { status: LoadingStatus.failure, error })
  }

  remove(id: string) {
    if (this.loadingObservable.has(id)) {
      const subject = this.loadingObservable.get(id)
      subject?.next(null)
      subject?.complete()
    }

    this.loadingMap.delete(id)
  }

  clear() {
    this.loadingMap = new Map()
    this.loadingObservable = new Map()
  }

  private set(id: string, loadingState: LoadingState) {
    const result = this.loadingMap.set(id, loadingState)
    if (this.loadingObservable.has(id)) {
      this.loadingObservable.get(id)!.next(loadingState)
    }
    return result
  }
}
