import {Connection, mongodb} from 'common/external/database'

export const getPackage = (connection: Connection) => async (arg: {
  databaseName: string
  databaseVersion: string
}) => {

  const stream = await getFile({
    connection: connection,
    databaseName: '8120698a-d5bc-4977-a0f3-9d6752e66780',
    bucketName: 'fs',
    fileId: '624deac9c3791b32fe3cbe34'
  })

  return {
    stream,
    filename: `database-1.0.0.tgz`,
  }

}

export const getFile = async (arg: {
  connection: Connection
  databaseName: string
  bucketName: string
  fileId: string
}) => {

  const db = arg.connection().db(arg.databaseName)
  const bucket = new mongodb.GridFSBucket(db, { bucketName: arg.bucketName })
  const objectId = new mongodb.ObjectId(arg.fileId)

  const stream = bucket.openDownloadStream(objectId)

  return stream
}
