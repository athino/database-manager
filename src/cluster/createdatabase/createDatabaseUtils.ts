import {schemas} from 'schemas/schemas'

export const createNewDatabase = (arg: {
  name: string
}) => {
  return schemas.newDatabase.build({
    name: arg.name,
    createdAt: new Date().getTime(),
    versions: {
      '1-0-0': {
        status: 'unpublished',
        major: 1,
        minor: 0,
        patch: 0,
        id: '1-0-0',
        semver: '1.0.0'
      }
    }
  })
}