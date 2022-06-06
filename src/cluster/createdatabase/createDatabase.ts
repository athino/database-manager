import {Connection, mongodb} from 'common/external/database'
import {CONSTANTS} from 'cluster/common/constants'
import {insertOne} from 'cluster/common/insertOne'
import {createNewDatabase} from './createDatabaseUtils'

export const createDatabase = (connection: Connection) => async (arg: {
  name: string
}) => {

  const newId = new mongodb.ObjectId().toString()

  const createNewDatabaseResult = createNewDatabase({
    name: arg.name,
    id: newId
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
