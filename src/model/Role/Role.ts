import { makeObservable, observable } from 'mobx'
import { tap } from 'rxjs/operators'
import { RxDocument } from 'rxdb'
import { BehaviorSubject } from 'rxjs'

import { CollectionName, Role as RoleSchema, RoomId } from '@declare'
import { Database } from '@service'
import { autoSubscribe, Store } from '@tool'

export class Role extends Store implements RoleSchema {
  roomId = '' as unknown as RoomId

  userToken = ''

  constructor() {
    super()
    makeObservable(this, {
      roomId: observable.ref,
      userToken: observable.ref,
    })
    this.reactToRoleChange()
  }

  @autoSubscribe
  reactToRoleChange() {
    const query: BehaviorSubject<RxDocument<RoleSchema>[]> = Database.database[CollectionName.Role].find().$
    return query
      .pipe(
        tap((docs) => {
          if (docs.length > 0) {
            const doc = docs[0].toJSON()
            this.roomId = doc.roomId
            this.userToken = doc.userToken
          }
        }),
      )
  }
}
