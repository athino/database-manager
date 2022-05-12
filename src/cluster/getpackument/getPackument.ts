import {CONSTANTS} from 'cluster/common/constants'
import {Model} from 'cluster/common/model/model'
import {Connection} from 'common/external/database'

export const getPackument = (connection: Connection) => async (arg: {
  databaseName: string,
  tarballUrl: string
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

  const getTarballUrl = (version: string) => `${arg.tarballUrl}/${arg.databaseName}/${version}`

  const versions = model.result.versions.map(({version}) => version)
  const latestVersion = '1.0.0'
  const lastModified = '2015-05-16T22:27:54.741Z'

  const packument = {
    "dist-tags": {
      "latest": latestVersion
    },
    "modified": lastModified,
    "name": arg.databaseName,
    "versions": versions.reduce((acc, cur) => {
      return {
        ...acc,
        [cur]: {
          _hasShrinkwrap: false,
          directories: {},
          dist: {
            tarball: getTarballUrl(cur)
          },
          name: arg.databaseName,
          version: cur
        }
      }
    }, {})
  }

  return {
    packument
  }
}