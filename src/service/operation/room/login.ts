import { BasicAjax } from '@tool'

import { LoginFields, LoginFieldKey, CollectionName } from '@declare'
import { mapValues } from 'lodash'
import Operation from '../Operation'

export class LoginOperation extends Operation<null, null> {
  constructor(ajax: BasicAjax, fields: LoginFields) {
    super(ajax)

    this.url = `${this.appId}/v1/room/entry`

    this.collectionName = CollectionName.Role

    this.body = mapValues(fields, (value, key) => {
      let temp: string | boolean | number = value
      if (key === LoginFieldKey.ENABLEAUDIO || key === LoginFieldKey.ENABLEVIDEO) {
        if (value === true) {
          temp = 1
        } else {
          temp = 0
        }
      }
      return temp
    })

    this.request$ = this.ajax.post(this.url, this.body)

    this.generateKey()
  }
}
