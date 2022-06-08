import {Connection} from 'common/external/database'
import {CONSTANTS} from 'cluster/common/constants'

export const getDatabase = (connection: Connection) => async (arg: {
  id: string
}) => {
    
  const db = connection().db(CONSTANTS.MAIN_DATABASE_NAME)
  const collection = db.collection(CONSTANTS.DATABASE_META_COLLECTION)

  const potentialDatabase = await collection.findOne({ _id: arg.id })

  return potentialDatabase
}