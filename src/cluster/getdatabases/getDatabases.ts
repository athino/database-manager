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
    .limit(arg.limit ?? NaN)
    .toArray()

  const items = result.map(({_id, ...database}) => database)

  console.log(items)

  if (!schemas.databases.validate(items)) { throw new Error() }

  const databases = objectFromEntries(items, (database) => ({
    key: database.name,
    value: database
  }))

  return {
    databases
  }
}
