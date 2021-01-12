import { RxJsonSchema } from 'rxdb'
import { CollectionName, Role, SchemaTypes } from '@declare'

import { createCommonFields } from './common'

export const UserSchema: RxJsonSchema<Role> = {

  ...createCommonFields(CollectionName.Role, 0),

  type: 'object',

  properties: {
    roomId: { type: SchemaTypes.String },
    userToken: { type: SchemaTypes.String, primary: true },
  },
}
