export enum CollectionName {
  Role = 'role'
}

export enum PrimaryKey {
  Role = 'userToken'
}

export interface CommonSchemaFields {
  title: CollectionName,

  version: number,

  description: string,
}
