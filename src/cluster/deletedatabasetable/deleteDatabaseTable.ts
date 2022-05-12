import {Connection} from 'common/external/database'
import {CONSTANTS} from 'cluster/common/constants'

export const deleteDatabaseTable = (connection: Connection) => async (arg: {
  databaseId: string
  version: string
  tableName: string
}) => {

  const db = connection().db(CONSTANTS.MAIN_DATABASE_NAME)
  const collection = db.collection(CONSTANTS.DATABASE_META_COLLECTION)

  await collection.updateOne(
    { 'versions.version': arg.version },
    { '$pull': { 'versions.$.tables': { 'tableName': arg.tableName } } }
  )

  return true
}
