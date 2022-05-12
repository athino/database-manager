import {Connection} from 'common/external/database'
import {CONSTANTS} from 'cluster/common/constants'

export const deleteDatabase = (connection: Connection) => async (arg: {
  id: string
}) => {

  const db = connection().db(CONSTANTS.MAIN_DATABASE_NAME)
  const collection = db.collection(CONSTANTS.DATABASE_META_COLLECTION)
  
  const deleteResult = await collection.deleteOne({ _id: arg.id })

  if (deleteResult.deletedCount !== 1) {
    throw new Error()
  }

  return true

}
