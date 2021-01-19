import { throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { BasicAjax } from '@tool'

import Operation from '../Operation'

export class GetRoomInfoOperation extends Operation<null, null> {
  constructor(
    ajax: BasicAjax,
    roomId: string,
    userToken: string,
  ) {
    super(ajax)

    this.url = `${this.appId}/v1/room/${roomId}`

    this.request$ = ajax.get(this.url, {}, { headers: { token: userToken } })
      .pipe(
        catchError((error) => throwError(error)),
      ) as any

    this.generateKey()
  }
}
