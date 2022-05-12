import {Connection} from 'common/external/database'
import {uploadTgzFile} from './utils/uploadTgzFile'
import {files} from './utils/files'
import {createShasum} from './utils/createShasum'
import {uploadShasum} from './utils/uploadShasum'

export const createPackage = (connection: Connection) => async (arg: {
  databaseName: string
  version: string
}) => {

  const result = await uploadTgzFile({
    connection: connection,
    databaseName: '8120698a-d5bc-4977-a0f3-9d6752e66780',
    bucketName: 'fs',
    fileName: `${arg.databaseName}-${arg.version}.tgz`,
    files: files,
    metadata: {
      description: 'Node module as .tgz file.'
    }
  })

  const {shasum} = await createShasum({
    connection: connection,
    databaseName: '8120698a-d5bc-4977-a0f3-9d6752e66780',
    bucketName: 'fs',
    fileId: result.fileId!
  })

  await uploadShasum({
    connection: connection,
    databaseName: arg.databaseName,
    version: arg.version,
    shasum: shasum!,
  })

  return result.fileId

}
