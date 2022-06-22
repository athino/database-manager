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
    name: arg.databaseName,
  })

  console.log(`11-${JSON.stringify(database)}`)

  if (!schemas.datatabseVersionsCheck.validate(database)) { console.log(schemas.datatabseVersionsCheck.validate.errors); throw new Error() }

  console.log(`12-${JSON.stringify(database)}`)

  const versions = Object.entries(database.versions)
    .map(([_key, value]) => value)
    .filter(({status}) => ['published', 'depricated'].includes(status))

  console.log(`13-${JSON.stringify(versions)}`)

  if (!schemas.packumentCheck.validate(versions)) { console.log(schemas.packumentCheck.validate.errors); throw new Error() }


  const packument = createPackument({
    baseUrl: arg.baseUrl,
    scopeName: arg.scopeName,
    packageName: arg.databaseName,
    versions: versions
  })

  console.log(`14-${JSON.stringify(packument)}`)

  return {
    packument
  }
}