import {Connection} from 'common/external/database'
import {getMainCollections} from 'cluster/common/getMainCollections'
import { deleteFile } from 'cluster/deletefile/deleteFile'

export const deleteDatabase = (connection: Connection) => async (arg: {
  name: string
}) => {
  const result = await getMainCollections(connection).meta.deleteOne({
    name: arg.name
  })

  deleteFile(connection)({
    name: arg.name
  })

  if (result.deletedCount !== 1) { throw new Error() }

  return true
}
