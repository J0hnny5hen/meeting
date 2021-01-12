/* eslint-disable prefer-rest-params */
/* eslint-disable prefer-spread */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
// @ts-ignore
import { Observable } from 'rxjs'
import { Store } from './store'

export function autoSubscribe<T extends Store>(_target: T, _name: string, descriptor: PropertyDescriptor) {
  const fn = descriptor.value
  descriptor.value = function (this: T, ...args: unknown[]) {
    const result: Observable<unknown> = fn.apply(this, args)
    const subscription = result.subscribe({
      error: (err: any) => {
        console.error(err)
      },
    })
    this.subscriptions.push(subscription)
    return result
  }
}
