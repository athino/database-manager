import {Connection, mongodb} from 'common/external/database'
import {Readable} from 'stream'

export const uploadFile = (connection: Connection) => async (arg: {
  buffer: Buffer
  filename: string
  contentType: string
}) => {
  return new Promise<{ wasUploaded: boolean }>(async (resolve) => {
    const db = connection().db('8120698a-d5bc-4977-a0f3-9d6752e66780')
    const bucket = new mongodb.GridFSBucket(db, { bucketName: 'fs' })
    const cursor = bucket.find({})
    const files = await cursor.toArray()

    for (const file of files) {
      if (arg.filename === file.filename) {
        await bucket.delete(file._id)
      }
    }

    const writeStream = bucket.openUploadStream(arg.filename, {
      contentType: arg.contentType
    })

    const readStream = Readable.from(arg.buffer.toString())

    readStream.on('error', () => {
      resolve({
        wasUploaded: false
      })
    })

    readStream.on('finish', async () => {
      resolve({
        wasUploaded: true
      })
    })

    console.log(readStream.readableFlowing)

    readStream.pipe(writeStream)
  })
}
