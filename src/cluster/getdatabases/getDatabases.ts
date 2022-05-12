import {Connection} from 'common/external/database'
import {CONSTANTS} from 'cluster/common/constants'

export const getDatabases = (connection: Connection) => async (arg: {
  limit?: number
}) => {
    
  const db = connection().db(CONSTANTS.MAIN_DATABASE_NAME)
  const collection = db.collection(CONSTANTS.DATABASE_META_COLLECTION)
  const databases = await collection.aggregate([
    {$facet: { 

      selected: [
        {$limit: 1},
        {$addFields: {id: '$_id'}},
        {$unset: '_id'}
      ],

      list: [
        {$project: {id: '$_id', name: '$name', _id: 0}}
      ]

    }}
  ]).toArray()


  const selected = databases[0]?.selected[0] as {
    id: string
    name: string
    versions: any[]
  }

  const list = databases[0]?.list as Array<{
    id: string
    name: string
  }>
  

  return {
    selected: selected,
    databases: list
  }
}
