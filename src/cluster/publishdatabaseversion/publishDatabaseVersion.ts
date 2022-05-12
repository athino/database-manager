import {CONSTANTS} from 'cluster/common/constants'
import {Connection} from 'common/external/database'

export const publishDatabaseVersion = (connection: Connection) => async (arg: {
  databaseName: string
  version: string
}) => {

  const db = connection().db(CONSTANTS.MAIN_DATABASE_NAME)
  const collection = db.collection(CONSTANTS.DATABASE_META_COLLECTION)

  const updateOneResult = await collection.updateOne(
    { 'name': arg.databaseName, 'versions.version': arg.version },
    { '$set': { 'versions.$.status': 'published' } }
  )

  return updateOneResult.acknowledged
}