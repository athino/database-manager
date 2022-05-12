import {Connection} from 'common/external/database'

export const uploadShasum = async (arg: {
  connection: Connection
  databaseName: string
  version: string,
  shasum: string
}) => {
  arg
}