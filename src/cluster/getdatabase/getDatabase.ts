import {Connection} from 'common/external/database'
import {schemas} from 'schemas/schemas'
import {getMainCollections} from 'cluster/common/getMainCollections'

export const getDatabase = (connection: Connection) => async (arg: {
  name: string
}) => {
  const result = await getMainCollections(connection).meta.findOne({
    name: arg.name
  })

  if (!result) { return }

  const {_id, ...database} = result

  if (!schemas.database.validate(database)) { throw new Error() }

  return database
}