import {Connection, mongodb} from 'common/external/database'

export const deleteFile = (connection: Connection) => async (arg: {
  name: string
}) => {
  const db = connection().db('8120698a-d5bc-4977-a0f3-9d6752e66780')
  const bucket = new mongodb.GridFSBucket(db, { bucketName: 'fs' })

  const files = await bucket.find({
    filename: { $regex: `^${arg.name}-\\d+.\\d+.\\d+.tgz$`}
  }).toArray()

  for (const file of files) {
    await bucket.delete(file._id)
  }

  return true
}