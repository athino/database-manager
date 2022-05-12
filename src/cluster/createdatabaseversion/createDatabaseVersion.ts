import {Connection, mongodb} from 'common/external/database'
import {Model} from 'cluster/common/model/model'
import {CONSTANTS} from 'cluster/common/constants'

export const createDatabaseVersion = (connection: Connection) => async (arg: {
  databaseId: string,
  type: 'major' | 'minor' | 'patch'
}) => {

  const db = connection().db(CONSTANTS.MAIN_DATABASE_NAME)
  const collection = db.collection(CONSTANTS.DATABASE_META_COLLECTION)

  const potentialDatabase = await collection.findOne({ _id: new mongodb.ObjectID(arg.databaseId) })

  const index = typeToIndex(arg.type)

  const model = new Model({
    type: 'Database',
    payload: potentialDatabase
  })

  if (model.error) {
    throw new Error()
  }



  return { value: 12 }

}

const typeToIndex = (type: 'major' | 'minor' | 'patch') => {
  switch (type) {
    case 'major': {
      return 0
    }
    case 'minor': {
      return 1
    }
    case 'patch': {
      return 2
    }
  }
}