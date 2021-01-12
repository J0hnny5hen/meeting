import { Subject } from 'rxjs'

export const error$ = new Subject<Error>()
export const message$ = new Subject()
