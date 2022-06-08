import {Database} from 'common/external/database'
import {ENV} from 'common/utils/constants'
import {getDatabases} from 'cluster/getdatabases/getDatabases'
import {getDatabase} from 'cluster/getdatabase/getDatabase'
import {deleteDatabase} from 'cluster/deletedatabase/deleteDatabase'
import {createDatabase} from 'cluster/createdatabase/createDatabase'
import {createPackage} from 'cluster/createpackage/createPackage'
import {getPackage} from 'cluster/getpackage/getPackage'
import {createDatabaseVersion} from 'cluster/createdatabaseversion/createDatabaseVersion'
import {createDatabaseTable} from 'cluster/createdatabasetable/createDatabaseTable'
import {deleteDatabaseTable} from 'cluster/deletedatabasetable/deleteDatabaseTable'
import {getPackument} from './getpackument/getPackument'
import {publishDatabaseVersion} from './publishdatabaseversion/publishDatabaseVersion'
import {setVersionStatusToPublished} from './setversionstatustopublished/setVersionStatusToPublished'
import {checkVersionIsUnpublished} from './checkversionisunpublished/checkVersionIsUnpublished'

export const database = new Database({
  uri: ENV.MONGODB_URI,
  methods: (connection) => ({
    getDatabases: getDatabases(connection),
    getDatabase: getDatabase(connection),
    deleteDatabase: deleteDatabase(connection),
    createDatabase: createDatabase(connection),
    createPackage: createPackage(connection),
    getPackage: getPackage(connection),
    createDatabaseVersion: createDatabaseVersion(connection),
    createDatabaseTable: createDatabaseTable(connection),
    deleteDatabaseTable: deleteDatabaseTable(connection),
    getPackument: getPackument(connection),
    publishDatabaseVersion: publishDatabaseVersion(connection),
    setVersionStatusToPublished: setVersionStatusToPublished(connection),
    checkVersionIsUnpublished: checkVersionIsUnpublished(connection)
  })
})
