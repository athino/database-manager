import {getMainCollections} from 'cluster/common/getMainCollections'
import {Connection} from 'common/external/database'
import {createPackument} from 'createpackument/createPackument'
import {schemas} from 'schemas/schemas'

export const getPackument = (connection: Connection) => async (arg: {
  baseUrl: string
  scopeName: string
  databaseName: string
}) => {

  const database = await getMainCollections(connection).meta.findOne({
    name: arg.databaseName
  })

  if (!schemas.datatabseVersionsCheck.validate(database)) { throw new Error() }

  const versions = database.versions.filter(({status}) => {
    return status === 'published' || status === 'depricated'
  })

  if (!schemas.packumentCheck.validate(versions)) { throw new Error() }

  const packument = createPackument({
    baseUrl: arg.baseUrl,
    scopeName: arg.scopeName,
    packageName: arg.databaseName,
    versions: versions.map((version) => ({
      major: version.major,
      minor: version.minor,
      patch: version.patch,
      semver: version.semver,
      published: version.published,
      shasum: version.shasum
    }))
  })

  return {
    packument
  }
}