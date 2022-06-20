import {Connection} from 'common/external/database'
import {getMainCollections} from 'cluster/common/getMainCollections'
import {schemas} from 'schemas/schemas'
import {objectFromEntries} from 'common/utils/objectFromEntries'

export const getDatabases = (connection: Connection) => async (arg: {
  limit?: number
}) => {
    
  const result = await getMainCollections(connection).meta
    .find()
    .sort({ createdAt: 1 })
    .limit(50)
    .toArray()

  if (!schemas.databases.validate(result)) { throw new Error() }

  const databases = objectFromEntries(result, (database) => ({
    key: database.name,
    value: database
  }))

  return {
    databases
  }
}
