import { createPackage } from 'cluster/createpackage/createPackage'
import {database} from 'cluster/database'
import { setVersionStatusToPublished } from 'cluster/setversionstatustopublished/setVersionStatusToPublished'
import {Connection} from 'common/external/database'

export const publishDatabaseVersion = (connection: Connection) => async (arg: {
  databaseName: string
  databaseVersion: string
}) => {

  const result = await database.checkVersionIsUnpublished({
    databaseName: arg.databaseName,
    databaseVersion: arg.databaseVersion
  })

  // if (result.error || !result.payload.isUnpublished) { return }

  const {shasum, filename} = await createPackage(connection)({
    databaseName: arg.databaseName,
    version: arg.databaseVersion,
    scope: 'database-manager'
  })

  await setVersionStatusToPublished(connection)({
    databaseName: arg.databaseName,
    databaseVersion: arg.databaseVersion
  })

  return true
}