import { addRxPlugin, RxDatabase, createRxDatabase } from 'rxdb'
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode'
import { RxDBValidatePlugin } from 'rxdb/plugins/validate'
import collections from './collections'

addRxPlugin(RxDBDevModePlugin)

addRxPlugin(require('pouchdb-adapter-memory'))

addRxPlugin(RxDBValidatePlugin)

export class Database {
  name = 'db'

  adapter = 'memory'

  password = ''

  multiInstance = true

  eventReduce = true

  options = {}

  pouchSettings = {}

  static database: RxDatabase

  async init() {
    Database.database = await createRxDatabase({
      name: this.name,
      adapter: this.adapter,
      password: this.password,
      multiInstance: this.multiInstance,
      eventReduce: this.eventReduce,
      options: this.options,
      pouchSettings: this.pouchSettings,
    })
    return Promise.all(collections.map((col) => Database.database.collection(col)))
  }
}
