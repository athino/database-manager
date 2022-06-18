import {getMainCollections} from 'cluster/common/getMainCollections'
import {Connection} from 'common/external/database'
import {createPackument} from 'createpackument/createPackument'

export const getPackument = (connection: Connection) => async (arg: {
  databaseName: string
  scopeName: string
  tarballBaseUrl: string
}) => {

  const database = await getMainCollections(connection).meta.findOne({
    name: arg.databaseName
  })

  const packument = createPackument({
    scopeName: arg.scopeName,
    packageName: arg.databaseName,
    versions: []
  })

  return {
    packument
  }
}