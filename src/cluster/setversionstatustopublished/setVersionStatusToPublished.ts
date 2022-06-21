import {getMainCollections} from 'cluster/common/getMainCollections'
import {Connection} from 'common/external/database'

export const setVersionStatusToPublished = (connection: Connection) => async (arg: {
  name: string
  semver: string
  shasum: string
}) => {
  const {acknowledged} = await getMainCollections(connection).meta.updateOne(
      { 'name': arg.name},
      {
        '$set': {
          [`versions.${arg.semver}.status`]: 'published',
          [`versions.${arg.semver}.shasum`]: arg.shasum
        } 
      }
  )

  return acknowledged
}