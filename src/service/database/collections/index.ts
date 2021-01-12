import { RxCollectionCreator } from 'rxdb'
import { CollectionName } from '@declare'
import { UserSchema } from './user'

const collections: RxCollectionCreator[] = [
  {
    name: CollectionName.Role,
    schema: UserSchema,
  },
]

export default collections
