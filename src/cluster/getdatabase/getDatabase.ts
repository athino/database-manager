import {Connection} from 'common/external/database'
import {schemas} from 'schemas/schemas'
import {getMainCollections} from 'cluster/common/getMainCollections'

export const getDatabase = (connection: Connection) => async (arg: {
  id: string
}) => {
  const database = await getMainCollections(connection).meta.findOne({
    _id: arg.id
  })

  if (!schemas.database.validate(database)) { throw new Error() }

  return database
}