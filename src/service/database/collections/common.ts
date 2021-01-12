import { CollectionName, CommonSchemaFields } from '@declare'

export function createCommonFields(title: CollectionName, version: number, description: string = ''): CommonSchemaFields {
  return {
    title,
    version,
    description,
  }
}
