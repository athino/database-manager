import {uploadFile} from 'cluster/uploadfile/uploadFile'
import {Connection} from 'common/external/database'
import {createTar} from 'createtar/createTar'

export const createPackage = (connection: Connection) => async (arg: {
  databaseName: string
  id: string
  scope: string
}) => {
  const semver = arg.id.replaceAll('-', '.')

  const {tarBuffer, tarShasum} = await createTar({
    name: arg.databaseName,
    scope: arg.scope,
    semver: semver,
    methods: [{
        name: 'getUser',
        content: 'foo'
    }]
  })

  const filename = `${arg.databaseName}-${semver}.tgz`

  const {wasUploaded} = await uploadFile(connection)({
    filename: filename,
    buffer: tarBuffer,
    contentType: 'application/x-gzip'
  })

  return {
    shasum: wasUploaded ? tarShasum : undefined,
  }
}
