import {Connection, mongodb} from 'common/external/database'

export const insertOne = async (arg: {
    connection: Connection
    databaseName: string
    collectionName: string
    document: mongodb.Document
}): Promise<({
    error: true
    id: undefined
  }) | ({
    error: false
    id: string
  })> => {

  try {

    const collection = arg.connection()
        .db(arg.databaseName)
        .collection(arg.collectionName)

    const insertOneResult = await collection.insertOne({
      ...arg.document
    })

    if (!insertOneResult.acknowledged) {
      throw new Error()
    }

    return {
        error: false,
        id: insertOneResult.insertedId.toString()
    }

  } catch (error) {
    return {
        error: true,
        id: undefined
    }

  }

}
