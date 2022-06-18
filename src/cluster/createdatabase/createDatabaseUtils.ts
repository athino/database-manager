import {schemas} from 'schemas/schemas'

export const createNewDatabase = (arg: {
  name: string
}) => {
  const result = schemas.newDatabase.build({
    name: arg.name,
    versions: [{
      status: 'unpublished',
      semver: '1.0.0',
      methods: [],
      tables: [{
        tableName: 'table1',
        columns: [{
          columnName: 'column1',
          type: 'string'
        },{
          columnName: 'column2',
          type: 'boolean'
        },{
          columnName: 'column3',
          type: 'number'
        }]
      }],
      latestUsage: []
    }]
  })
  
  return result
}