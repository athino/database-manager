import {Connection, mongodb} from 'common/external/database'
import archiver from 'archiver'

export const uploadTgzFile = async (arg: {
  connection: Connection
  databaseName: string
  bucketName: string
  fileName: string
  metadata: {
    [key: string]: string
  },
  files: Array<{
    fileName: string
    fileExtension: string
    fileContent: string
  }>
}) => {
  const db = arg.connection().db(arg.databaseName)

  const bucket = new mongodb.GridFSBucket(db, {
    bucketName: arg.bucketName
  })

  const tar = archiver('tar', {
    zlib: { level: 9 },
    gzip: true
  })

  arg.files.forEach((file) => {
    tar.append(file.fileContent, {
      name: `${file.fileName}.${file.fileExtension}`
    })
  })

  tar.finalize()

  const id = new mongodb.ObjectId()

  const stream = tar.pipe(bucket.openUploadStream(`${arg.fileName}.tgz`, {
    contentType: 'application/x-gzip',
    id: id,
    metadata: arg.metadata
  }))

  return new Promise<{
    fileId: string | undefined
  }>((resolve) => {

    stream.on('error', () => {
      resolve({
        fileId: undefined
      })
    })

    stream.on('close', async () => {
      const cursor = bucket.find({})

      const idFound = (await cursor.map((doc) => {
        return id.equals(doc._id)
      }).toArray()).includes(true)

      if (idFound) {
        resolve({
          fileId: id.toString()
        })
      } else {
        resolve({
          fileId: undefined
        })
      }

    })

  })

}
