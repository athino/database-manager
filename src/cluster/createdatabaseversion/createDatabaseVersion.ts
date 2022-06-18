import {Connection} from 'common/external/database'
import {getMainCollections} from 'cluster/common/getMainCollections'

export const createDatabaseVersion = (connection: Connection) => async (arg: {
  name: string,
  type: 'major' | 'minor' | 'patch'
}) => {
  const potentialDatabase = await getMainCollections(connection).meta.findOne({ name: arg.name })

  const index = typeToIndex(arg.type)

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