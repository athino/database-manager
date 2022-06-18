import {Connection} from 'common/external/database'
import {CONSTANTS} from 'cluster/common/constants'
import {insertOne} from 'cluster/common/insertOne'
import {createNewDatabase} from './createDatabaseUtils'

export const createDatabase = (connection: Connection) => async (arg: {
  name: string
}) => {

  const newDatabase = createNewDatabase({
    name: arg.name
  })

  const result = await insertOne({
    connection: connection,
    collectionName: CONSTANTS.DATABASE_META_COLLECTION,
    databaseName: CONSTANTS.MAIN_DATABASE_NAME,
    document: newDatabase
  })

  if (result.error) {
    throw new Error()
  }

  return {
    id: result.id
  }

}
