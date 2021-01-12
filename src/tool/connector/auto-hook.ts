import { useEffect, useRef } from 'react'
import { Store } from './store'

export function autoObserve<T extends Store>(CStore: new (...args: unknown[]) => T) {
  const storeRef = useRef<T>()

  if (!storeRef.current) {
    storeRef.current = new CStore()
  }
  useEffect(() => () => storeRef.current?.subscriptions.forEach((sub) => sub.unsubscribe()), [])
  return storeRef.current!
}
