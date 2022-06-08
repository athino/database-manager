import {getMainCollections} from 'cluster/common/getMainCollections'
import {Connection} from 'common/external/database'

export const checkVersionIsUnpublished = (connection: Connection) => async (arg: {
  databaseName: string
  databaseVersion: string
}) => {
    const result = await getMainCollections(connection).meta.findOne({
        'name': arg.databaseName,
        'versions.version': arg.databaseVersion,
        'status': 'unpublished'
    })

    return {
        isUnpublished: result !== null
    }
}