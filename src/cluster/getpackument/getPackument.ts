import {CONSTANTS} from 'cluster/common/constants'
import {Model} from 'cluster/common/model/model'
import {Connection} from 'common/external/database'

export const getPackument = (connection: Connection) => async (arg: {
  databaseName: string,
  tarballUrl: string,
  scopeName: string
}) => {

  const db = connection().db(CONSTANTS.MAIN_DATABASE_NAME)
  const collection = db.collection(CONSTANTS.DATABASE_META_COLLECTION)

  const potentialDatabase = await collection.findOne({ name: arg.databaseName })

  const model = new Model({
    type: 'Database',
    payload: potentialDatabase
  })

  if (model.error) {
    return undefined
  }

  const getTarballUrl = (version: string) => `${arg.tarballUrl}/${arg.scopeName}/${arg.databaseName}/-/${arg.databaseName}-${version}.tgz`

  const versions = model.result.versions.map(({version}) => version)
  const latestVersion = '1.0.0'
  const lastModified = '2015-05-16T22:27:54.741Z'

  const packument = {
    "dist-tags": {
      "latest": latestVersion
    },
    "modified": lastModified,
    "name": `${arg.scopeName}/${arg.databaseName}`,
    "versions": versions.reduce((acc, cur) => {
      return {
        ...acc,
        [cur]: {
          _hasShrinkwrap: false,
          directories: {},
          dist: {
            shasum: 'bbf102d5ae73afe2c553895e0fb02230216f65b1',
            tarball: getTarballUrl(cur)
          },
          name: `${arg.scopeName}/${arg.databaseName}`,
          version: cur
        }
      }
    }, {})
  }

  return {
    packument
  }
}