import {schemas} from 'schemas/schemas'

export const createNewDatabase = (arg: {
  name: string
}) => {
  const result = schemas.newDatabase.build({
    name: arg.name,
    versions: {
      '1.0.0': {
        status: 'unpublished',
        major: 1,
        minor: 0,
        patch: 0,
        semver: '1.0.0'
      }
    }
  })
  
  return result
}