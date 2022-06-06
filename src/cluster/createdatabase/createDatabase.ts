import {Connection, mongodb} from 'common/external/database'
import {CONSTANTS} from 'cluster/common/constants'
import {insertOne} from 'cluster/common/insertOne'
import { createNewDatabase } from './createDatabaseUtils'

export const createDatabase = (connection: Connection) => async (arg: {
  name: string
}) => {

  const database = createNewDatabase({
    name: arg.name,
    id: new mongodb.ObjectId().toString()
  })

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
