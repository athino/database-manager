import {Connection} from 'common/external/database'
import crypto from 'crypto'
import {getFile} from './getFile'

export const createShasum = async (arg: {
  connection: Connection
  databaseName: string
  bucketName: string
  fileId: string
}): Promise<{ shasum: undefined | string }> => {
  const hash = crypto.createHash('sha1')
  hash.setEncoding('hex')

  const stream = await getFile({
    connection: arg.connection,
    databaseName: arg.databaseName,
    bucketName: arg.bucketName,
    fileId: arg.fileId
  })

  return new Promise((resolve, reject) => {
    stream.on('error', () => {
      reject({
        shasum: undefined
      })
    })

    stream.on('end', () => {
      resolve({
        shasum: hash.end().read()
      })
    })

    stream.pipe(hash)
  })
}