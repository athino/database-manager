import {database} from 'cluster/database'
import {Connection} from 'common/external/database'

export const publishDatabaseVersion = (_connection: Connection) => async (arg: {
  databaseName: string
  databaseVersion: string
}) => {

  const result = await database.checkVersionIsUnpublished({
    databaseName: arg.databaseName,
    databaseVersion: arg.databaseVersion
  })

  // if (result.error || !result.payload.isUnpublished) { return }

  await database.setVersionStatusToPublished({
    databaseName: arg.databaseName,
    databaseVersion: arg.databaseVersion
  })

  await database.createPackage({
    databaseName: arg.databaseName,
    version: arg.databaseVersion,
    scope: 'database-manager'
  })

  return true
}