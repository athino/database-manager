import {getMainCollections} from 'cluster/common/getMainCollections'
import {Connection} from 'common/external/database'

export const setVersionStatusToPublished = (connection: Connection) => async (arg: {
  databaseName: string
  databaseVersion: string
  shasum: string
}) => {
    const {acknowledged} = await getMainCollections(connection).meta.updateOne(
        { 'name': arg.databaseName, 'versions.version': arg.databaseVersion },
        {
          '$set': {
            'versions.$.status': 'published',
            'versions.$.shasum': arg.shasum
          } 
        }
    )

    return acknowledged
}