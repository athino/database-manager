import {Connection, mongodb} from "common/external/database"

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