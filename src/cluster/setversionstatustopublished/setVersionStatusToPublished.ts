import {getMainCollections} from 'cluster/common/getMainCollections'
import {Connection} from 'common/external/database'

export const setVersionStatusToPublished = (connection: Connection) => async (arg: {
  databaseName: string
  databaseVersion: string
}) => {
    const updateOneResult = await getMainCollections(connection).meta.updateOne(
        { 'name': arg.databaseName, 'versions.version': arg.databaseVersion },
        { '$set': { 'versions.$.status': 'published' } }
    )

    return updateOneResult.acknowledged
}