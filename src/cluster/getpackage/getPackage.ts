import {Connection, mongodb} from 'common/external/database'

export const getPackage = (connection: Connection) => async (arg: {
  filename: string
}) => {
  const db = connection().db('8120698a-d5bc-4977-a0f3-9d6752e66780')
  const bucket = new mongodb.GridFSBucket(db, { bucketName: 'fs' })
  const stream = bucket.openDownloadStreamByName(arg.filename)

  return {
    stream: stream,
    filename: arg.filename
  }
}