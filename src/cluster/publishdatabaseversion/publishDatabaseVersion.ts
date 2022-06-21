import {createPackage} from 'cluster/createpackage/createPackage'
import {database} from 'cluster/database'
import {setVersionStatusToPublished} from 'cluster/setversionstatustopublished/setVersionStatusToPublished'
import {Connection} from 'common/external/database'

export const publishDatabaseVersion = (connection: Connection) => async (arg: {
  name: string
  semver: string
}) => {

  const result = await database.checkVersionIsUnpublished({
    databaseName: arg.name,
    databaseVersion: arg.semver
  })

  // if (result.error || !result.payload.isUnpublished) { return }

  const {shasum} = await createPackage(connection)({
    databaseName: arg.name,
    version: arg.semver,
    scope: 'database-manager'
  })

  if (!shasum) { throw new Error() }

  await setVersionStatusToPublished(connection)({
    name: arg.name,
    semver: arg.semver,
    shasum: shasum
  })

  return true
}