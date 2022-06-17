import {uploadFile} from 'cluster/uploadfile/uploadFile'
import {Connection} from 'common/external/database'
import {createTar} from 'createtar/createTar'

export const createPackage = (connection: Connection) => async (arg: {
  databaseName: string
  version: string
  scope: string
}) => {
  const {tarBuffer, tarShasum} = await createTar({
      methods: [{
          name: 'getUser',
          content: 'foo'
      }]
  })

  const filename = `${arg.databaseName}-${arg.version}.tgz`

  const {wasUploaded} = await uploadFile(connection)({
    filename: filename,
    buffer: tarBuffer,
    contentType: 'application/x-gzip'
  })

  return {
    shasum: wasUploaded ? tarShasum : undefined,
    filename
  }
}
