import {Connection} from 'common/external/database'
import {getFile} from './getFile'
import ssri from 'ssri'
import {stream2buffer} from './streamToBuffer'

export const createShasum = async (arg: {
  connection: Connection
  databaseName: string
  bucketName: string
  fileId: string
}): Promise<{ shasum: undefined | string }> => {

  const tarball = await getFile({
    connection: arg.connection,
    databaseName: arg.databaseName,
    bucketName: arg.bucketName,
    fileId: arg.fileId
  })

  const buffer = await stream2buffer(tarball)

  const integrity = ssri.fromData(buffer, {
    algorithms: ['sha1', 'sha512']
  })

  const shasum = integrity.hexDigest()

  return {
    shasum
  }
}