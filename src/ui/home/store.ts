import { Store } from '@tool/connector/store'
import { action, makeObservable, observable } from 'mobx'
import { Subject } from 'rxjs'
import { filter, map, switchMap, tap, concatMap } from 'rxjs/operators'
import { mapValues } from 'lodash'

import { LoginFieldKey as FieldKey, StorageFields, LoginFields, initialLoginFields } from '@declare'
import { autoSubscribe, isSuccessState } from '@tool'
import { operatorAPI, storageAPI } from '@core'

export default class HomeStore extends Store {
  fields = initialLoginFields

  logging = false

  private login$ = new Subject()

  constructor() {
    super()
    const storageFields = storageAPI.get<LoginFields>(StorageFields.Session)
    if (storageFields) {
      this.fields = mapValues(storageFields, (value, key) => {
        if (key === FieldKey.ENABLEAUDIO || key === FieldKey.ENABLEVIDEO) {
          if (value === 'false') {
            return false
          }
          return true
        }
        return value
      }) as LoginFields
    }
    makeObservable(this, {
      fields: observable.ref,
      logging: observable.ref,
      setFields: action,
      setLogging: action,
    })
    this.reactToLogin()
  }

  setFields = (fields: LoginFields) => {
    this.fields = { ...this.fields, ...fields, [FieldKey.ROOMNAME]: fields[FieldKey.ROOMID] }
  }

  setLogging = (flag: boolean) => {
    this.logging = flag
  }

  login = () => {
    this.login$.next()
  }

  @autoSubscribe
  reactToLogin() {
    return this.login$.pipe(
      tap(() => {
        this.setLogging(true)
        storageAPI.set(StorageFields.Session, this.fields)
      }),
      switchMap(() => operatorAPI.login(this.fields)
        .getLoading$()
        .pipe(
          filter(isSuccessState),
          map((resp) => resp.response),
          tap(console.info),
        )),
      concatMap(({ roomId, userToken }) => operatorAPI.getRoomInfo(roomId as string, userToken as string)
        .getLoading$()),
    )
  }
}
