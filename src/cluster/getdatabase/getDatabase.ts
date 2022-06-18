import {Connection} from 'common/external/database'
import {CONSTANTS} from 'cluster/common/constants'
import { schemas } from 'schemas/schemas'

export const getDatabase = (connection: Connection) => async (arg: {
  id: string
}) => {
    
  const db = connection().db(CONSTANTS.MAIN_DATABASE_NAME)
  const collection = db.collection(CONSTANTS.DATABASE_META_COLLECTION)

  const database = await collection.findOne({ _id: arg.id })

  if (!schemas.database.validate(database)) { throw new Error() }

  return database
}