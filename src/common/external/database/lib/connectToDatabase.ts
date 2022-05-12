import {MongoClient} from 'mongodb'

let cachedClient: MongoClient | null = null

export const connectToDatabase = async (arg: {
  uri: string
}) => {
  if (cachedClient) {
    return {
      client: cachedClient
    }
  }

  const client = new MongoClient(arg.uri)
  await client.connect()

  cachedClient = client

  return {
    client: cachedClient
  }
}
