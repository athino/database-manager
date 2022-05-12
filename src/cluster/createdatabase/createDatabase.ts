import {Connection, mongodb} from 'common/external/database'
import {Model} from 'cluster/common/model/model'
import {Database} from 'cluster/common/model/models/database'
import {CONSTANTS} from 'cluster/common/constants'
import {insertOne} from 'cluster/common/insertOne'

export const createDatabase = (connection: Connection) => async (arg: {
  name: string
}) => {

  const database: Database = {
    name: arg.name,
    id: new mongodb.ObjectId().toString(),
    versions: [{
      status: 'unpublished',
      version: '1.0.0',
      methods: [],
      tables: [{
        tableName: 'table1',
        columns: [{
          columnName: 'column1',
          type: 'string'
        },{
          columnName: 'column2',
          type: 'boolean'
        },{
          columnName: 'column3',
          type: 'number'
        }]
      }],
      latestUsage: []
    }]
  }

  const model = new Model({
    type: 'Database',
    payload: database
  })

  if (model.error) {
    throw new Error()
  }

  const {id, ...rest} = model.result

  const result = await insertOne({
    connection: connection,
    collectionName: CONSTANTS.DATABASE_META_COLLECTION,
    databaseName: CONSTANTS.MAIN_DATABASE_NAME,
    document: {
      _id: id,
      ...rest
    }
  })

  if (result.error) {
    throw new Error()
  }

  return {
    id: result.id
  }

}
