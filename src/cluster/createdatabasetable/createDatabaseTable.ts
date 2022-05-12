import {Connection} from 'common/external/database'
import {CONSTANTS} from 'cluster/common/constants'

export const createDatabaseTable = (connection: Connection) => async (arg: {
  id: string
}) => {

  const db = connection().db(CONSTANTS.MAIN_DATABASE_NAME)
  const collection = db.collection(CONSTANTS.DATABASE_META_COLLECTION)

  const newTable = {
    tableName: 'myTableName_' + new Date().getTime(),
    columns: [{
      columnName: 'column1',
      type: 'number'
    },{
      columnName: 'column2',
      type: 'string'
    },{
      columnName: 'column3',
      type: 'boolean'
    }]
  }

  const createDatabaseTableResult = await collection.updateOne(
    { 'versions.version': [1,0,0] },
    { '$push': { "versions.$.tables": newTable } }
 )

  return true
}
