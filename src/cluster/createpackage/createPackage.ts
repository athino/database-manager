import {Connection} from 'common/external/database'
import {database} from 'cluster/database'
import {createTar} from 'createtar/createTar'

export const createPackage = (_connection: Connection) => async (arg: {
  databaseName: string
  version: string
  scope: string
}) => {

  const {tarBuffer} = await createTar({
      methods: [{
          name: 'getUser',
          content: 'foo'
      }]
  })

  database.uploadFile({
    filename: '',
    buffer: tarBuffer,
    contentType: 'application/x-gzip'
  })
}
